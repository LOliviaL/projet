// Import Firebase modules
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  getFirestore,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCkaS4YCD_oKoluhpeVHuSu_g7tiYhDI3s",
    authDomain: "le-fil-d-actu-collaboratif.firebaseapp.com",
    projectId: "le-fil-d-actu-collaboratif",
    storageBucket: "le-fil-d-actu-collaboratif.firebasestorage.app",
    messagingSenderId: "6333401339",
    appId: "1:6333401339:web:090b3d4ae4c792dab4085e",
    measurementId: "G-MFB7076DJ2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- DOM Elements ---
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupButton = document.getElementById("signup");
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const userEmailP = document.getElementById("user-email");
const postSection = document.getElementById("post-section");

// --- INSCRIPTION ---
signupButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Inscription réussie !");
      emailInput.value = "";
      passwordInput.value = "";
    })
    .catch((error) => alert(`Erreur lors de l'inscription : ${error.message}`));
});

// --- CONNEXION ---
loginButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Connexion réussie !");
      emailInput.value = "";
      passwordInput.value = "";
    })
    .catch((error) =>
      alert(`Erreur de connexion : ${error.message}`)
    );
});

// --- DÉCONNEXION ---
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Déconnexion réussie !");
    })
    .catch((error) => alert(`Erreur lors de la déconnexion : ${error.message}`));
});

// --- OBSERVER L'ÉTAT D'AUTHENTIFICATION ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Utilisateur connecté
    userEmailP.textContent = `Connecté en tant que : ${user.email}`;
    logoutButton.style.display = "inline-block";
    signupButton.style.display = "none";
    loginButton.style.display = "none";
    postSection.style.display = "block";
  } else {
    // Utilisateur déconnecté
    userEmailP.textContent = "";
    logoutButton.style.display = "none";
    signupButton.style.display = "inline-block";
    loginButton.style.display = "inline-block";
    postSection.style.display = "none";
  }
});
