import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN ,
  databaseURL: import.meta.env.VITE_DB_URL ,
  projectId: import.meta.env.VITE_PROJ_ID ,
  storageBucket: import.meta.env.VITE_BUCK ,
  messagingSenderId: import.meta.env.VIT_MESS_ID,
  appId: import.meta.env.VITE_APP_ID ,
  measurementId: import.meta.env.VITE_MESH_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);