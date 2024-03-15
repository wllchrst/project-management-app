// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXukUPW_LAWAkyG2CO_JNG-dCwQyGSxaY",
  authDomain: "project-management-app-43f8a.firebaseapp.com",
  projectId: "project-management-app-43f8a",
  storageBucket: "project-management-app-43f8a.appspot.com",
  messagingSenderId: "627371971170",
  appId: "1:627371971170:web:0180bf8406450e4b00b73b",
  measurementId: "G-CF09BMQP6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const userCollection = collection(db, "users");
const projectCollection = collection(db, "projects");
const storage = getStorage(app);
const partnerChatCollection = collection(db, "chat_partner");
const jobChatCollection = collection(db, "chat_job");

const analytics = getAnalytics(app);
export {
  app,
  auth,
  db,
  userCollection,
  projectCollection,
  storage,
  partnerChatCollection,
  jobChatCollection,
};
