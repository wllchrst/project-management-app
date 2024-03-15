import { onSnapshot, query, where } from "firebase/firestore";
import { projectCollection } from "../utils/firebase";
import { useEffect, useState } from "react";
import { IProject } from "../interfaces/project-interface";

export default function useProject(id: string) {
  const [project, setProject] = useState<IProject>({} as IProject);
  const [isLoading, setIsLoading] = useState(true);

  async function getProjects() {
    try {
      const q = query(projectCollection, where("id", "==", id));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0].data != undefined) {
          setProject(snapshot.docs[0].data() as IProject);
          setIsLoading(false);
        }
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return { project, isLoading };
}
