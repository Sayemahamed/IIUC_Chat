// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjsg_ipTLu8kCE05vj3ObGxBB4DQO5EUw",
  authDomain: "iiucchat.firebaseapp.com",
  databaseURL:
    "https://iiucchat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iiucchat",
  storageBucket: "iiucchat.appspot.com",
  messagingSenderId: "885404164153",
  appId: "1:885404164153:web:4a57892810904cd74fade8",
  measurementId: "G-66PVBVYFKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://iiucchat.appspot.com");
