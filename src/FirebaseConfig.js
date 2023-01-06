import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVTGMja57-HGINEyDSJ80W5I7KOKacljI",
  authDomain: "crud-89eaa.firebaseapp.com",
  projectId: "crud-89eaa",
  storageBucket: "crud-89eaa.appspot.com",
  messagingSenderId: "917738414210",
  appId: "1:917738414210:web:8c598c25fd9ee3c48fd49b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
