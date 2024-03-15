import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import { getAllUserInformation, getUserInformation } from "../functions/user";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { userCollection } from "../utils/firebase";
import { useUserAuth } from "../contexts/user-context";
import useChat from "./use-chats";

export default function useFriends() {
  const [friends, setFriends] = useState<IUser[]>([]);
  const { user } = useUserAuth();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserFriend() {
    try {
      const q = query(userCollection, where("email", "==", user.email));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0].data != undefined) {
          const user = snapshot.docs[0].data() as IUser;
          getAllUserInformation(user.friends).then((result) => {
            setFriends(result);
            console.log(result);
            setIsLoading(false);
          });
        }
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.email != undefined) getUserFriend();
  }, [user]);

  return { isLoading, friends };
}
