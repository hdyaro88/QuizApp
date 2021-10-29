// Import the functions you need from the SDKs you need
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBLI_DXaGO8HujqgpjHeq1nJ97JJygoCzo",
  authDomain: "node-react-e3649.firebaseapp.com",
  projectId: "node-react-e3649",
  storageBucket: "node-react-e3649.appspot.com",
  messagingSenderId: "41045462888",
  appId: "1:41045462888:web:7cf59495e78fc90d11d0dd",
  measurementId: "G-GNV66KBQH9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();