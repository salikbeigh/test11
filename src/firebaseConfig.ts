import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  enableIndexedDbPersistence,
  serverTimestamp, // 🔑 Added this import
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 🔑 Import auth from the correct module

const firebaseConfig = {
  apiKey: "AIzaSyAF0ndN7yMIRj_dcG2JUwHAXrvhWdukwM4",
  authDomain: "transportapp-ebc27.firebaseapp.com",
  projectId: "transportapp-ebc27",
  storageBucket: "transportapp-ebc27.appspot.com",
  messagingSenderId: "72359441649",
  appId: "1:72359441649:web:674e55171fbe4bbcebe550",
  measurementId: "G-4K9W8T8NLR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // 🔑 Initialize auth

// 🔥 Disable Firestore offline persistence to always get fresh data
enableIndexedDbPersistence(db)
  .then(() => {
    console.log("Firestore persistence enabled.");
  })
  .catch((err) => {
    console.error("Error enabling Firestore persistence:", err);
  });

// Debugging: Log Firestore updates
onSnapshot(collection(db, "updates"), (snapshot) => {
  console.log(
    "🔄 Firestore updates received:",
    snapshot.docs.map((doc) => doc.data())
  );
});

export {
  db,
  auth, // 🔑 Export the auth instance
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
};
