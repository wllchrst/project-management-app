import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import { getDocs, query, where } from "firebase/firestore";
import { userCollection } from "../utils/firebase";

export default function useFindUser() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [find, setFind] = useState("");

  async function getUserInformation(email: string) {
    setIsLoading(true);
    try {
      const q = query(userCollection, where("email", "==", email));

      const data = await getDocs(q);
      const users = data.docs.map((value, index) => value.data() as IUser);

      setUsers(users);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  async function getAllUser() {
    setIsLoading(true);
    try {
      const q = query(userCollection);
      const data = await getDocs(q);
      const users = data.docs.map((value, index) => value.data() as IUser);
      setUsers(users);
      console.log(users);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    if (find == "") getAllUser();
    else getUserInformation(find);
  }, [find]);

  return { users, isLoading, setFind };
}
