import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'  // Cambiado para usar Realtime Database
import { getStorage } from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxTHPhzHOALzY1nDuMgHST1qMY8CpqyYY",
  authDomain: "proyectofirebase-fcbba.firebaseapp.com",
  databaseURL: "https://proyectofirebase-fcbba-default-rtdb.firebaseio.com",
  projectId: "proyectofirebase-fcbba",
  storageBucket: "proyectofirebase-fcbba.appspot.com",
  messagingSenderId: "1074490168958",
  appId: "1:1074490168958:web:305cd78bf5c450daac2a2f",
  measurementId: "G-6D4SH2SXGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize firebase auth
const auth = getAuth(app);
// initialize realtime database
const db = getDatabase(app);  // Cambiado de getFirestore a getDatabase
const storage = getStorage(app);

// Exportar los servicios
export { app, auth, storage, db }