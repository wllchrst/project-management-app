import { IChatPartner } from "./../interfaces/chat-partner-interface.d";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IResponse } from "../interfaces/response-interface";
import { storage } from "../utils/firebase";
import { ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";
import { IJob } from "../interfaces/job-interface";
import { Status } from "../enums/job-status-enum";

function successResponse(message: string, data: any | null): IResponse {
  return {
    success: true,
    message: message,
    data: data,
  };
}
function failedResponse(message: string, data: any | null): IResponse {
  return {
    success: false,
    message: message,
    data: data,
  };
}

async function postImage(file: File) {
  const imageRef = ref(storage, file.name);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);
  return url;
}

function getFile(
  event: ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
) {
  if (event.target.files) {
    const currentFile = event.target.files[0];
    setFile(currentFile);
  }
}

function dateStringToTimestamp(dateString: string) {
  return Timestamp.fromDate(new Date(dateString));
}

function timestampToDate(time: Timestamp) {
  return time.toDate();
}

function timestampString(time: Timestamp) {
  const date = time.toDate();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function isPast(time: Timestamp) {
  const currentTimestamp = Timestamp.now();
  return time.seconds < currentTimestamp.seconds;
}

function showChat(chat: IChatPartner, to: string, from: string) {
  if (chat.from == from && chat.to == to) return true;
  else if (chat.from == to && chat.to == from) return true;
  return false;
}

function jobColor(job: IJob) {
  const current = new Date();
  const deadline = timestampToDate(job.deadline);
  if (job.status != Status.DONE && deadline < current) return "rgb(255,0,0";
  else if (job.status == Status.DONE) return "rgb(0,255,0";
  return "rgb(0,0,255";
}

function isJobDone(job: IJob) {
  return job.status == Status.DONE;
}

export {
  jobColor,
  isJobDone,
  successResponse,
  failedResponse,
  postImage,
  getFile,
  dateStringToTimestamp,
  timestampToDate,
  isPast,
  timestampString,
  showChat,
};
