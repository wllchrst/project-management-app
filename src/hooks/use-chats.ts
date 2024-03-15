import { useEffect, useRef, useState } from "react";
import { IChatPartner } from "../interfaces/chat-partner-interface";
import { partnerChatCollection } from "../utils/firebase";
import { onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { useUserAuth } from "../contexts/user-context";

export default function useChat(to: string) {
  const [chats, setChats] = useState<IChatPartner[]>([]);
  const { user } = useUserAuth();

  async function getChat() {
    const from = user.email;
    try {
      const q = query(partnerChatCollection, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const current: IChatPartner[] = [];
        snapshot.docs.forEach((doc) => {
          current.push(doc.data() as IChatPartner);
        });

        current.filter((chat) => {
          if (chat.from == from && chat.to == to) {
            return true;
          } else if (chat.from == to && chat.to == from) {
            return true;
          }
          return false;
        });

        setChats(current);
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.email != undefined) getChat();
  }, [user.email]);

  return { chats };
}
