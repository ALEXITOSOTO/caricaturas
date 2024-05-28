import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUmaNCO1YbdS7hLZ8zxOGoXlJuwHDAcmk",
    authDomain: "proyectocaricaturas.firebaseapp.com",
    projectId: "proyectocaricaturas",
    storageBucket: "proyectocaricaturas.appspot.com",
    messagingSenderId: "420932423381",
    appId: "1:420932423381:web:ab311483cc148ea79adc5c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Cerrar sesión
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Sesión cerrada');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error al cerrar sesión: ', error);
    });
});

const productform = document.getElementById("form-product-insert");
productform.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "caricaturas"), {
        nombre: productform.nombreCaricatura.value,
        year: productform.year.value,
        creador: productform.creador.value,
        genero: productform.genero.value,
        pais: productform.pais.value,
        personajes: productform.personajes.value,
        duracion: productform.duracion.value,
        temporadas: productform.temporadas.value,
        vigencia: productform.vigencia.value,
        popularidad: productform.popularidad.value,
    });
    productform.reset();
});

async function eliminarCaricatura(docId) {
    try {
        await deleteDoc(doc(db, "caricaturas", docId));
        const row = document.getElementById(docId);
        if (row) {
            row.remove();
        }
    } catch (error) {
        console.error("Error al eliminar caricatura: ", error);
    }
}

async function editarCaricatura(docId) {
    console.log("Intentando editar caricatura con ID:", docId);
    const docRef = doc(db, "caricaturas", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('nombreCaricaturaEdit').value = data.nombre;
        document.getElementById('yearEdit').value = data.year;
        document.getElementById('creadorEdit').value = data.creador;
        document.getElementById('generoEdit').value = data.genero;
        document.getElementById('paisEdit').value = data.pais;
        document.getElementById('personajesEdit').value = data.personajes;
        document.getElementById('duracionEdit').value = data.duracion;
        document.getElementById('temporadasEdit').value = data.temporadas;
        document.getElementById('vigenciaEdit').value = data.vigencia;
        document.getElementById('popularidadEdit').value = data.popularidad;
        document.getElementById('editDocId').value = docId;

        console.log("Mostrando modal de edición.");
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    }
}

const editForm = document.getElementById('form-product-edit');
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const docId = document.getElementById('editDocId').value;
    const docRef = doc(db, "caricaturas", docId);

    await updateDoc(docRef, {
        nombre: document.getElementById('nombreCaricaturaEdit').value,
        year: document.getElementById('yearEdit').value,
        creador: document.getElementById('creadorEdit').value,
        genero: document.getElementById('generoEdit').value,
        pais: document.getElementById('paisEdit').value,
        personajes: document.getElementById('personajesEdit').value,
        duracion: document.getElementById('duracionEdit').value,
        temporadas: document.getElementById('temporadasEdit').value,
        vigencia: document.getElementById('vigenciaEdit').value,
        popularidad: document.getElementById('popularidadEdit').value,
    });
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
});

const caricaturasTableBody = document.getElementById("caricaturasTableBody");

function mostrarDatosEnTabla(snapshot) {
    caricaturasTableBody.innerHTML = ""; 
    snapshot.forEach((doc) => {
        const caricaturaData = doc.data();
        const row = document.createElement('tr');
        row.id = doc.id;
        row.innerHTML = `
            <td>${caricaturaData.nombre}</td>
            <td>${caricaturaData.year}</td>
            <td>${caricaturaData.creador}</td>
            <td>${caricaturaData.genero}</td>
            <td>${caricaturaData.pais}</td>
            <td>${caricaturaData.personajes}</td>
            <td>${caricaturaData.duracion}</td>
            <td>${caricaturaData.temporadas}</td>
            <td>${caricaturaData.vigencia}</td>
            <td>${caricaturaData.popularidad}</td>
            <td>
                <button data-doc-id="${doc.id}" class="btn-eliminar btn btn-danger">Eliminar</button>
                <button data-doc-id="${doc.id}" class="btn-editar btn btn-warning">Editar</button>
            </td>
        `;
        caricaturasTableBody.appendChild(row);
    });
}

caricaturasTableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-eliminar")) {
        const docId = event.target.getAttribute('data-doc-id');
        eliminarCaricatura(docId);
    }
    if (event.target.classList.contains("btn-editar")) {
        const docId = event.target.getAttribute('data-doc-id');
        editarCaricatura(docId);
    }
});

onSnapshot(collection(db, "caricaturas"), (snapshot) => {
    mostrarDatosEnTabla(snapshot);
});

getDocs(collection(db, "caricaturas")).then((snapshot) => {
    mostrarDatosEnTabla(snapshot);
});