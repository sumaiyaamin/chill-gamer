// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuyqRwY4oy40ewdhTfxh8a8E95xGNdRWg",
  authDomain: "chill-gamer-68a9e.firebaseapp.com",
  projectId: "chill-gamer-68a9e",
  storageBucket: "chill-gamer-68a9e.firebasestorage.app",
  messagingSenderId: "854378853085",
  appId: "1:854378853085:web:15c18a70608f8e4fd66134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);