import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxTHPhzHOALzY1nDuMgHST1qMY8CpqyYY",
  authDomain: "proyectofirebase-fcbba.firebaseapp.com",
  databaseURL: "https://proyectofirebase-fcbba-default-rtdb.firebaseio.com",
  projectId: "proyectofirebase-fcbba",
  storageBucket: "proyectofirebase-fcbba.firebasestorage.app",
  messagingSenderId: "1074490168958",
  appId: "1:1074490168958:web:305cd78bf5c450daac2a2f",
  measurementId: "G-6D4SH2SXGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth(app);  // Añadir app como parámetro
const db = getFirestore(app);  // Añadir app como parámetro
const storage = getStorage(app);  // Cambiar el nombre para que coincida con la exportación

export {app, auth, storage, db}  // Exportar storage en lugar de firebaseStorage