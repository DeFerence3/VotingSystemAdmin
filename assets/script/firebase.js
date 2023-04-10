
const firebaseConfig = {
  apiKey: "AIzaSyCjkXPnUijS3uYWvuPheSjJeFvoiZ7nrQ0",
  authDomain: "election-online-prj.firebaseapp.com",
  databaseURL:
    "https://election-online-prj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "election-online-prj",
  storageBucket: "election-online-prj.appspot.com",
  messagingSenderId: "281761267368",
  appId: "1:281761267368:web:fb0663844a76d66df40c9d",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const store = firebase.storage();
