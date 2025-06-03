// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Tu configuración de Firebase - REEMPLAZA CON TUS CREDENCIALES REALES
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAv_Vt06ThmOomxqN23M4476WzOPsRBFek",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "manejo-as.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "manejo-as",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "manejo-as.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "494760789918",
  appId: process.env.FIREBASE_APP_ID || "1:494760789918:web:7204470b8fab6c6effb88f"
};

// Verificar configuración
console.log('Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

let app;
let db;

try {
  // Inicializar Firebase
  app = initializeApp(firebaseConfig);
  
  // Inicializar Firestore
  db = getFirestore(app);
  
  console.log('Firebase inicializado correctamente');
} catch (error) {
  console.error('Error inicializando Firebase:', error);
  throw error;
}

module.exports = { db, app };