import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCx8JeHS3t-cq9Jrd1jFKKRai0uPGriFOg",
  authDomain: "my-site-f678f.firebaseapp.com",
  databaseURL: "https://my-site-f678f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-site-f678f",
  storageBucket: "my-site-f678f.firebasestorage.app",
  messagingSenderId: "579644661712",
  appId: "1:579644661712:web:34d495fe788c5c5605e3d5",
  measurementId: "G-926KMVJ48F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, set, runTransaction };
