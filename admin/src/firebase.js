import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//console.log(process.env.REACT_APP_FIREBASE_API_KEI)
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCutF_e5JIrN_rqaYyDqiMLtnpZK_Vb5Sg',
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };
const firebaseConfig = {

  apiKey: "AIzaSyCDIW3myjHkc0sf3101_CwxvDra6Xv-qNM",
  authDomain: "upload-672f5.firebaseapp.com",
  projectId: "upload-672f5",
  storageBucket: "upload-672f5.appspot.com",
  messagingSenderId: "476839298790",
  appId: "1:476839298790:web:250a5ae13e3483e6a4dd27"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth();
export const storage = getStorage();

//
// REACT_APP_FIREBASE_API_KEI = AIzaSyCutF_e5JIrN_rqaYyDqiMLtnpZK_Vb5Sg
// REACT_APP_FIREBASE_AUTH_DOMAIN = fir-3e969.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID = fir-3e969
// REACT_APP_FIREBASE_STORAGE_BUCKET = fir-3e969.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 82938281406
// REACT_APP_FIREBASE_APP_ID = 1:82938281406:web:09b6f2285cfea9c4e14def

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });