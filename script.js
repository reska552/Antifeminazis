import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "PEGAR_ACA",
  authDomain: "PEGAR_ACA",
  databaseURL: "PEGAR_ACA",
  projectId: "PEGAR_ACA"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// visitas
const visitasRef = ref(db, "visitas");

get(visitasRef).then((snap) => {
  let v = snap.val() || 0;
  set(visitasRef, v + 1);
});

onValue(visitasRef, (snap) => {
  document.getElementById("visitas").innerText = snap.val();
});

// likes
function like() {
  const refLikes = ref(db, "likes");
  get(refLikes).then((snap) => {
    set(refLikes, (snap.val() || 0) + 1);
  });
}

onValue(ref(db, "likes"), snap => {
  document.getElementById("likes").innerText = snap.val() || 0;
});

// comentarios
function enviarComentario() {
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;

  push(ref(db, "comentarios"), { nombre, comentario });
}

onValue(ref(db, "comentarios"), (snapshot) => {
  const contenedor = document.getElementById("comentarios");
  contenedor.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    contenedor.innerHTML += `<p><b>${data.nombre}</b>: ${data.comentario}</p>`;
  });
});

window.like = like;
window.enviarComentario = enviarComentario;
