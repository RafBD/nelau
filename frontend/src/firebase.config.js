import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMnuDM46rmdA6jjPkfp1iv5drxAcyaCxc",
  authDomain: "nelau-app.firebaseapp.com",
  projectId: "nelau-app",
  storageBucket: "nelau-app.firebasestorage.app",
  messagingSenderId: "795973955629",
  appId: "1:795973955629:web:5ba3a7da62a9af6a5948a4",
  measurementId: "G-R0FDFM7JE1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa los servicios de Firebase que vamos a usar
export const auth = getAuth(app);
export const db = getFirestore(app);