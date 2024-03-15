import { Timestamp } from "firebase/firestore";
import { Status } from "../enums/job-status-enum";

export interface IJob {
  id: string;
  title: string;
  description: string;
  deadline: Timestamp;
  workers: string[];
  status: Status;
}
