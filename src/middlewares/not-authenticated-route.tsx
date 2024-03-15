import { IChildren } from "../interfaces/children-interface";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/user-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, userCollection } from "../utils/firebase";
import { IUser } from "../interfaces/user-interface";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

export default function UnProtected({ children }: IChildren) {
  const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();
  const { isAuth, setAuth, setUser, user } = useUserAuth();
  const toast = useToast();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setAuth(true);
        if (user.email != null) {
          const q = query(userCollection, where("email", "==", user.email));

          getDocs(q).then((snapshot) => {
            const user = snapshot.docs[0].data() as IUser;
            setUser(user);
          });
        }

        setFetched(true);
      } else {
        // No user is signed in.
        setAuth(false);
        setFetched(true);
      }
    });

    // Unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!fetched) return;

    if (isAuth() && fetched) {
      toast({
        position: "top-right",
        title: "Authentication",
        description: "You are logged in",
        isClosable: true,
        status: "warning",
      });
      navigate("/detail");
    }
  }, [fetched]);

  return <>{children}</>;
}
