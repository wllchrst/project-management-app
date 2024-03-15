import { Timestamp } from "firebase/firestore";

export interface IChatPartner {
  from: string;
  to: string;
  message: string;
  created: Timestamp;
}
