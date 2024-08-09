// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_OOZFsA2Cap34bAmzSB5x8-WL9eWE3Fo",
  authDomain: "collaborate-979d3.firebaseapp.com",
  projectId: "collaborate-979d3",
  storageBucket: "collaborate-979d3.appspot.com",
  messagingSenderId: "728732329174",
  appId: "1:728732329174:web:ca5044ac31ded8b7c71577",
  measurementId: "G-MQTHFNW5Z2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);