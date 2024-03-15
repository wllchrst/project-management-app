import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ILogin } from "../interfaces/login-interface";
import { auth } from "../utils/firebase";
import { failedResponse, successResponse } from "./utility";

async function loginUser(user: ILogin) {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
    return successResponse("Login Success", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Failed Login", null);
  }
}

async function signOutCurrentUser() {
  try {
    await signOut(auth);
    return successResponse("Logged Out", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Failed Sign Out", null);
  }
}

export { loginUser, signOutCurrentUser };
