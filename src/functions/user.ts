import { IChatPartner } from "./../interfaces/chat-partner-interface.d";
import { IUser } from "./../interfaces/user-interface.d";
import {
  Timestamp,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { partnerChatCollection, userCollection } from "../utils/firebase";
import {
  dateStringToTimestamp,
  failedResponse,
  successResponse,
} from "./utility";
import { clearConfigCache } from "prettier";

async function getUserInformation(email: string) {
  try {
    const q = query(userCollection, where("email", "==", email));

    const snapshot = await getDocs(q);

    const user = snapshot.docs[0].data() as IUser;
    return user;
  } catch (error) {
    return null;
  }
}

async function getAllUserInformation(emails: string[]) {
  const users: IUser[] = [];
  for (const email of emails) {
    const user = await getUserInformation(email);
    if (user == null) continue;
    users.push(user);
  }

  return users;
}

async function getUserDoc(email: string) {
  try {
    const q = query(userCollection, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.docs[0]) return snapshot.docs[0];
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function updateUserInformation(user: IUser) {
  try {
    const userDoc = await getUserDoc(user.email);
    if (userDoc == null) return false;
    await updateDoc(userDoc.ref, user as any);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addFriend(first: string, second: string) {
  const firstUser = await getUserInformation(first);
  const secondUser = await getUserInformation(second);

  if (!firstUser || !secondUser)
    return failedResponse("failed adding friend", null);

  if (firstUser.friends.includes(secondUser.email))
    return failedResponse("You are already friend with this user", null);
  firstUser.friends.push(secondUser.email);
  secondUser.friends.push(firstUser.email);

  let updating = await updateUserInformation(firstUser);
  if (!updating) return failedResponse("failed adding friend", null);

  updating = await updateUserInformation(secondUser);
  if (!updating) return failedResponse("failed adding friend", null);

  return successResponse("Success adding new friend", null);
}

async function sendChatPartner(from: IUser, to: IUser, message: string) {
  if (message == "") return false;

  const current = new Date();

  const chat: IChatPartner = {
    from: from.email,
    to: to.email,
    message: message,
    created: Timestamp.fromDate(current),
  };

  try {
    await addDoc(partnerChatCollection, chat);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export {
  getUserInformation,
  getAllUserInformation,
  addFriend,
  sendChatPartner,
  updateUserInformation,
};
