import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_APP_KEY",
  authDomain: "mgsfineline.firebaseapp.com",
  databaseURL: "https://mgsfineline-default-rtdb.firebaseio.com",
  projectId: "mgsfineline",
  storageBucket: "mgsfineline.appspot.com",
  messagingSenderId: "794676245747",
  appId: "1:794676245747:web:4b46381ddd35ca392e7386",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
