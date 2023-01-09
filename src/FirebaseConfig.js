import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCVTGMja57-HGINEyDSJ80W5I7KOKacljI",
  authDomain: "crud-89eaa.firebaseapp.com",
  projectId: "crud-89eaa",
  storageBucket: "crud-89eaa.appspot.com",
  messagingSenderId: "917738414210",
  appId: "1:917738414210:web:8c598c25fd9ee3c48fd49b",
});

const db = firebaseConfig.firestore();

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
const auth = getAuth(firebaseConfig);

// export const db = getFirestore(app);
export default db;
export { auth };
