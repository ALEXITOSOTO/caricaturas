import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUmaNCO1YbdS7hLZ8zxOGoXlJuwHDAcmk",
  authDomain: "proyectocaricaturas.firebaseapp.com",
  projectId: "proyectocaricaturas",
  storageBucket: "proyectocaricaturas.appspot.com",
  messagingSenderId: "420932423381",
  appId: "1:420932423381:web:ab311483cc148ea79adc5c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "gestionCaricaturas.html";
    })
    .catch((error) => {
      const alertContainer = document.getElementById("alert-container");
      alertContainer.innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            Error al iniciar sesión: Correo o contraseña incorrectos.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
      console.error("Error al iniciar sesión: ", error);
    });
});

document.getElementById("google-login-btn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "gestionCaricaturas.html";
    })
    .catch((error) => {
      const alertContainer = document.getElementById("alert-container");
      alertContainer.innerHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            Error al iniciar sesión con Google.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
      console.error("Error al iniciar sesión con Google: ", error);
    });
});
