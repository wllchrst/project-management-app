import { useEffect, useState } from "react";
import { IProject } from "../interfaces/project-interface";
import { IUser } from "../interfaces/user-interface";
import { getAllUserInformation } from "../functions/user";
import { onSnapshot, query, where } from "firebase/firestore";
import { projectCollection } from "../utils/firebase";

export default function useProjectPartner(project: IProject) {
  const [workers, setWorkers] = useState<IUser[]>([]);
  const [isFetchingWorker, setIsFetchingWorker] = useState(true);

  async function getWorkers() {
    try {
      const q = query(projectCollection, where("id", "==", project.id));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        getAllUserInformation(project.workers).then((result) => {
          setWorkers(result);
          setIsFetchingWorker(false);
        });
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWorkers();
  }, []);

  return { isFetchingWorker, workers };
}
