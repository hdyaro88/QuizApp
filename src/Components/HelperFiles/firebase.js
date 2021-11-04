// Import the functions you need from the SDKs you need
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC6t7gF4sfW9xp7yIVMOb2FpF7LLnwUT48",
  authDomain: "quizreact-7fba1.firebaseapp.com",
  projectId: "quizreact-7fba1",
  storageBucket: "quizreact-7fba1.appspot.com",
  messagingSenderId: "1071091065616",
  appId: "1:1071091065616:web:bc87ffc030c9852ed3fb95",
  measurementId: "G-X3ZW4WB6KP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();