// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID
} = getEnvironments();
//console.log(env);
//console.log(import.meta.env); //solo lo lee el aplicativo
//console.log(process.env); // solo lo lee el test


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyATBCNU-_HfjrPkpaVk336gdCUgSXMUM80",
//   authDomain: "react-curso-newfirebase.firebaseapp.com",
//   projectId: "react-curso-newfirebase",
//   storageBucket: "react-curso-newfirebase.appspot.com",
//   messagingSenderId: "834487828850",
//   appId: "1:834487828850:web:b266b400185b8c97441deb"
// };

// //testing
// const firebaseConfig = {
//   apiKey: "AIzaSyA0hdLSmHnfI75qCiVcfGBLXlTZllp9l8s",
//   authDomain: "react-test-879a2.firebaseapp.com",
//   projectId: "react-test-879a2",
//   storageBucket: "react-test-879a2.appspot.com",
//   messagingSenderId: "873866275765",
//   appId: "1:873866275765:web:dd71c09b9a9fed406607fc",
//   measurementId: "G-0JM9ZTYLEN"
// };
const firebaseConfig = {
  apiKey:VITE_APIKEY,
  authDomain:VITE_AUTHDOMAIN,
  projectId:VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET,
  messagingSenderId:VITE_MESSAGINGSENDERID,
  appId:VITE_APPID,
  measurementId:VITE_MEASUREMENTID,
};

//console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );