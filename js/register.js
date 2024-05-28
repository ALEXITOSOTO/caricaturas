import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
        const db = getFirestore(app);
        const provider = new GoogleAuthProvider();

        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email-register').value;
            const password = document.getElementById('password-register').value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await addDoc(collection(db, "users"), {
                    email: email,
                });
                window.location.href = "login.html";
            } catch (error) {
                console.error("Error al registrarse: ", error);
            }
        });

        document.getElementById('google-register-btn').addEventListener('click', async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                const userRef = collection(db, "users");
                const userDoc = await addDoc(userRef, {
                    email: user.email,
                    name: user.displayName,
                });
                window.location.href = "gestionCaricaturas.html";
            } catch (error) {
                console.error("Error al registrarse con Google: ", error);
            }
        });