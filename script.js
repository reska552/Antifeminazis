import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHTJukYkL_GbUrfB9MJB6dfWlu7NTmNTk",
  authDomain: "antifeminazis-58ae7.firebaseapp.com",
  databaseURL: "https://antifeminazis-58ae7-default-rtdb.firebaseio.com/",
  projectId: "antifeminazis-58ae7",
  storageBucket: "antifeminazis-58ae7.firebasestorage.app",
  messagingSenderId: "81459037751",
  appId: "1:81459037751:web:0f000ac0743e493b4ea1b2",
  measurementId: "G-CVQ5F44Y4K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// VISITAS
const visitasRef = ref(db, "visitas");

get(visitasRef).then((snap) => {
  let v = snap.val() || 0;
  set(visitasRef, v + 1);
});

onValue(visitasRef, (snap) => {
  document.getElementById("visitas").innerText = snap.val();
});

// LIKES
function like() {
  const refLikes = ref(db, "likes");
  get(refLikes).then((snap) => {
    set(refLikes, (snap.val() || 0) + 1);
  });
}

onValue(ref(db, "likes"), snap => {
  document.getElementById("likes").innerText = snap.val() || 0;
});

// COMENTARIOS
function enviarComentario() {
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;

  if (!nombre || !comentario) return;

  push(ref(db, "comentarios"), { nombre, comentario });

  document.getElementById("comentario").value = "";
}

onValue(ref(db, "comentarios"), (snapshot) => {
  const contenedor = document.getElementById("comentarios");
  contenedor.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    contenedor.innerHTML += `<p><b>${data.nombre}</b>: ${data.comentario}</p>`;
  });
});

// FUNCIONES
window.like = like;
window.enviarComentario = enviarComentario;
