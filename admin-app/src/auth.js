import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY", // Lo obtienes en Firebase Console
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Función para login de admin
export const loginAdmin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true; // Login exitoso
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return false;
  }
};