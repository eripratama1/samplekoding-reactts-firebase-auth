
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9I7jGyzx5an487mqhDYwHibI3HFEZ4-g",
  authDomain: "reactjs-auth-f153e.firebaseapp.com",
  projectId: "reactjs-auth-f153e",
  storageBucket: "reactjs-auth-f153e.appspot.com",
  messagingSenderId: "527985373708",
  appId: "1:527985373708:web:28277eb9084e8983a03429"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}