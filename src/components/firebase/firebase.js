// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdiJ0wfxxgyaghWWD3-Peu65fPLqFpjRI",
  authDomain: "q-res-b42a0.firebaseapp.com",
  projectId: "q-res-b42a0",
  storageBucket: "q-res-b42a0.appspot.com",
  messagingSenderId: "9387524953",
  appId: "1:9387524953:web:e6d24f8ff70c4004a38248",
  measurementId: "G-3VN6TTHFKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export default app