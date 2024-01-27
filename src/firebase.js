// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-stack-blog-5c885.firebaseapp.com",
  projectId: "mern-stack-blog-5c885",
  storageBucket: "mern-stack-blog-5c885.appspot.com",
  messagingSenderId: "580547044447",
  appId: "1:580547044447:web:76161e3b4cee92fadd67ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);