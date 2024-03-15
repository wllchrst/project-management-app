import { useEffect, useState } from "react";
import { IChatGroup } from "../interfaces/chat-group-interface";
import { jobChatCollection } from "../utils/firebase";
import { onSnapshot, orderBy, query } from "firebase/firestore";

export default function useChatGroup(id: string) {
  const [chats, setChats] = useState<IChatGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGroupChat() {
    try {
      const q = query(jobChatCollection, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const current: IChatGroup[] = [];
        snapshot.docs.forEach((doc) => {
          current.push(doc.data() as IChatGroup);
        });
        setChats(current);
        setIsLoading(false);
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGroupChat();
  }, []);

  return { chats, isLoading };
}
