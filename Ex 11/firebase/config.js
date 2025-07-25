
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsR9_8UwVeWx40bD5DuYmlhp3C8TtLnBs",
  authDomain: "badasss-7d6e3.firebaseapp.com",
  projectId: "badasss-7d6e3",
  storageBucket: "badasss-7d6e3.appspot.com",
  messagingSenderId: "712671802052",
  appId: "1:712671802052:web:26339ed52b983b1d080f91"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
