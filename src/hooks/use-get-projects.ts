import { useEffect, useState } from "react";
import { IProject } from "../interfaces/project-interface";
import { getDocs, query, where, onSnapshot } from "firebase/firestore";
import { projectCollection } from "../utils/firebase";
import { useUserAuth } from "../contexts/user-context";
import { successResponse } from "../functions/utility";

export default function useProjects() {
  const { user } = useUserAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProjects() {
    try {
      const q = query(
        projectCollection,
        where("workers", "array-contains", user.email)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ps: IProject[] = [];
        snapshot.forEach((doc) => {
          const postData = doc.data() as IProject;
          ps.push(postData);
        });
        setIsLoading(false);
        setProjects(ps);
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = getProjects();
  }, [user]);

  return { projects, isLoading };
}
