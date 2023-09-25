// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaYwlULPhKOFO0HR66PhQEZFzV9y7ROSo",
  authDomain: "reactproject-ca3c9.firebaseapp.com",
  databaseURL: "https://reactproject-ca3c9-default-rtdb.firebaseio.com",
  projectId: "reactproject-ca3c9",
  storageBucket: "reactproject-ca3c9.appspot.com",
  messagingSenderId: "190857162790",
  appId: "1:190857162790:web:58afc534ed3c251f7c36e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth();
export default app;
