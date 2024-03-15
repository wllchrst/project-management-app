import { addDoc } from "firebase/firestore";
import { IRegister } from "../interfaces/register-interface";
import { IResponse } from "../interfaces/response-interface";
import { auth, userCollection } from "../utils/firebase";
import { failedResponse, successResponse } from "./utility";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IUser } from "../interfaces/user-interface";

function isValidEmail(email: string): boolean {
  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateRegistration(data: IRegister): string | null {
  // Validate name
  if (!data.name.trim()) {
    return "Name is required";
  }

  // Validate email
  if (!data.email.trim()) {
    return "Email is required";
  } else if (!isValidEmail(data.email)) {
    return "Invalid email format";
  }

  // Validate password
  if (!data.password.trim()) {
    return "Password is required";
  } else if (data.password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  // Validate confirmPassword
  if (!data.confirmPassword.trim()) {
    return "Confirm password is required";
  } else if (data.confirmPassword !== data.password) {
    return "Passwords do not match";
  }

  // If all validations pass
  return null;
}

async function registerUser(
  registerInformation: IRegister
): Promise<IResponse> {
  const validation = validateRegistration(registerInformation);
  if (validation != null) {
    return failedResponse(validation, null);
  }

  await createUserWithEmailAndPassword(
    auth,
    registerInformation.email,
    registerInformation.password
  );

  const userInformation: IUser = {
    email: registerInformation.email,
    friends: [],
    name: registerInformation.name,
    password: registerInformation.password,
    profile: "",
  };

  await addDoc(userCollection, userInformation);

  return successResponse("Account Registered", null);
}

export { registerUser };
