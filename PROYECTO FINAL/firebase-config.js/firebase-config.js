// firebase-config.js

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDapd0Mwq5wzuhFg2hGXMNhq6CwrqfQRGQ",
  authDomain: "bda-restuarante.firebaseapp.com",
  projectId: "bda-restuarante",
  storageBucket: "bda-restuarante.firebasestorage.app",
  messagingSenderId: "751252281463",
  appId: "1:751252281463:web:7b65d3a32a5c6764bf8e72"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("✅ Firebase inicializado correctamente");
