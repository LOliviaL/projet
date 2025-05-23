import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkaS4YCD_oKoluhpeVHuSu_g7tiYhDI3s",
  authDomain: "le-fil-d-actu-collaboratif.firebaseapp.com",
  projectId: "le-fil-d-actu-collaboratif",
  storageBucket: "le-fil-d-actu-collaboratif.firebasestorage.app",
  messagingSenderId: "6333401339",
  databaseURL: "https://le-fil-d-actu-collaboratif-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:6333401339:web:090b3d4ae4c792dab4085e",
  measurementId: "G-MFB7076DJ2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Références DOM
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

const signupBtn = document.getElementById("signup");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");

const postSection = document.getElementById("post-section");
const statusMessage = document.getElementById("status-message");
const messageInput = document.getElementById("message");
const postBtn = document.getElementById("post");
const messagesDiv = document.getElementById("messages");

// INSCRIPTION
signupBtn.addEventListener("click", () => {
  const email = signupEmail.value;
  const password = signupPassword.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      statusMessage.textContent = `✅ Inscription réussie : ${email}`;
      signupEmail.value = "";
      signupPassword.value = "";
    })
    .catch((err) => {
      statusMessage.textContent = `❌ Erreur d'inscription : ${err.message}`;
    });
});

// CONNEXION
loginBtn.addEventListener("click", () => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      statusMessage.textContent = `✅ Connecté avec : ${email}`;
      loginEmail.value = "";
      loginPassword.value = "";
    })
    .catch((err) => {
      statusMessage.textContent = `❌ Erreur de connexion : ${err.message}`;
    });
});

// DÉCONNEXION
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    statusMessage.textContent = "👋 Déconnecté avec succès.";
  });
});

// GESTION DE SESSION
onAuthStateChanged(auth, (user) => {
  if (user) {
    postSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    postSection.style.display = "none";
    logoutBtn.style.display = "none";
  }
});

// ENVOI DE MESSAGE
postBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  const text = messageInput.value.trim();
  if (user && text) {
    await addDoc(collection(db, "messages"), {
      text,
      email: user.email,
      createdAt: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// AFFICHAGE DES MESSAGES (historique)
const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const msg = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<strong>${msg.email}</strong><br>${msg.text}`;
    messagesDiv.appendChild(div);
  });
});
