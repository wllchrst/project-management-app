import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/user-context";
import Detail from "../pages/detail-page";
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
import Home from "../pages/home-page";
import { useToast } from "@chakra-ui/react";
import MainLayout from "../layouts/layout";
import Project from "../pages/project-page";
import ProjectDetail from "../pages/project-detail-page";
import Partners from "../pages/partners-page";

export default function MiddlewareRoutes() {
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

    if (!isAuth() && fetched) {
      toast({
        position: "top-right",
        title: "Authentication",
        description: "You need to be logged in",
        isClosable: true,
        status: "warning",
      });
      navigate("/");
    }
  }, [fetched]);

  return (
    <Routes>
      <Route
        path="/detail"
        element={
          <MainLayout>
            <Detail></Detail>
          </MainLayout>
        }
      ></Route>
      <Route
        path="/home"
        element={
          <MainLayout>
            <Home></Home>
          </MainLayout>
        }
      ></Route>
      <Route
        path="/projects"
        element={
          <MainLayout>
            <Project></Project>
          </MainLayout>
        }
      ></Route>
      <Route
        path="/projects/:id"
        element={
          <MainLayout>
            <ProjectDetail></ProjectDetail>
          </MainLayout>
        }
      ></Route>
      <Route
        path="/partners"
        element={
          <MainLayout>
            <Partners></Partners>
          </MainLayout>
        }
      ></Route>
    </Routes>
  );
}
