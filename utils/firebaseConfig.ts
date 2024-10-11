import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArj7uTCFGXCLVPCYv1Ri5xoy-6SuDeB2c",
  authDomain: "wordle-552bf.firebaseapp.com",
  projectId: "wordle-552bf",
  storageBucket: "wordle-552bf.appspot.com",
  messagingSenderId: "373930996426",
  appId: "1:373930996426:web:2ce49d8075a01252047a33"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);