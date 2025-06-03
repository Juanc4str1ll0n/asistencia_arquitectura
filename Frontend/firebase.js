// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQhr7Y-eTciKJzmGdhmyLVxDyuUGL321c",
  authDomain: "manejoasistencia-61b56.firebaseapp.com",
  projectId: "manejoasistencia-61b56",
  storageBucket: "manejoasistencia-61b56.firebasestorage.app",
  messagingSenderId: "920437242924",
  appId: "1:920437242924:web:2bcc9fa1ad97e5ab3ee589",
  measurementId: "G-FNPGY6PME8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
