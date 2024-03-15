import { Timestamp } from "firebase/firestore";

export interface IChatGroup {
  id: string;
  from: string;
  created: Timestamp;
  message: string;
}
