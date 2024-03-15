import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import { onSnapshot, query, where } from "firebase/firestore";
import { projectCollection } from "../utils/firebase";
import { IProject } from "../interfaces/project-interface";
import { IJob } from "../interfaces/job-interface";
import { getAllUserInformation } from "../functions/user";

export default function useJobParticipant(projectId: string, jobId: string) {
  const [participants, setPartipants] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getParticipant() {
    try {
      const q = query(projectCollection, where("id", "==", projectId));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0].data() != undefined) {
          const project = snapshot.docs[0].data() as IProject;
          for (const job of project.jobs) {
            if (job.id == jobId) {
              getAllUserInformation(job.workers).then((users) => {
                console.log(users);
                setPartipants(users);
                setIsLoading(false);
              });
              break;
            }
          }
        }
      });

      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getParticipant();
  }, []);

  return { participants, isLoading };
}
