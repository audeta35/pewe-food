// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAMxcELM0w1kGdAxyZnGfWJOUZ661KEf5E",
  authDomain: "pewe-food.firebaseapp.com",
  projectId: "pewe-food",
  storageBucket: "pewe-food.appspot.com",
  messagingSenderId: "68032131158",
  appId: "1:68032131158:web:2457aeb1d3c7d12929cbf7",
  databaseURL: "https://pewe-food-default-rtdb.asia-southeast1.firebasedatabase.app/"

};


// Initialize Firebase
export const provider = new GoogleAuthProvider();
export const FirebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(FirebaseApp);