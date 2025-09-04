// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-aeb5e.firebaseapp.com",
  projectId: "mern-blog-aeb5e",
  storageBucket: "mern-blog-aeb5e.firebasestorage.app",
  messagingSenderId: "185134664077",
  appId: "1:185134664077:web:bf3db6bbc0572f2e3595c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);