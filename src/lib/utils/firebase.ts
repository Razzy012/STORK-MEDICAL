// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnhLFTxV5p7Y84AR3nB_X8aIGaA3qY2XM",
  authDomain: "stork-medical-e715c.firebaseapp.com",
  projectId: "stork-medical-e715c",
  storageBucket: "stork-medical-e715c.appspot.com",
  messagingSenderId: "253073097203",
  appId: "1:253073097203:web:a8125ff8772004a5341286"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
