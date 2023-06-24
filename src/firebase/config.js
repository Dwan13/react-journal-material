// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATBCNU-_HfjrPkpaVk336gdCUgSXMUM80",
  authDomain: "react-curso-newfirebase.firebaseapp.com",
  projectId: "react-curso-newfirebase",
  storageBucket: "react-curso-newfirebase.appspot.com",
  messagingSenderId: "834487828850",
  appId: "1:834487828850:web:b266b400185b8c97441deb"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );