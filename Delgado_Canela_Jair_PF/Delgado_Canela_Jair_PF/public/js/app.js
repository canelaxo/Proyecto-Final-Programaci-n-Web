document.addEventListener("DOMContentLoaded", () => {
  // Botón para listar caricaturas
  document
    .getElementById("btnCaricaturas")
    .addEventListener("click", listarCaricaturas);

  // Formulario para enviar caricatura
  document
    .getElementById("formularioCaricatura")
    .addEventListener("submit", enviarCaricatura);
});

const contenedorLista = document.getElementById("contenedorLista");
const contenedorCaricatura = document.getElementById("contenedorCaricatura");
const mensajeEnviar = document.getElementById("mensajeRegistro");

const urlBase = "http://127.0.0.1:3000/api/caricaturas";

function listarCaricaturas() {
  contenedorLista.innerHTML = "";
  fetch(urlBase)
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener las caricaturas");
      return res.json();
    })
    .then((caricaturas) => {
      caricaturas.forEach((caricatura) => {
        const div = document.createElement("div");
        div.className = "caricaturaDiv";
        const span = document.createElement("span");
        span.textContent = caricatura.titulo;
        div.appendChild(span);
        const btn = document.createElement("button");
        btn.textContent = "Detalles";
        btn.addEventListener("click", () => {
          mostrarCaricatura(`${urlBase}/${caricatura.id}`);
        });
        div.appendChild(btn);
        contenedorLista.appendChild(div);
      });
    })
    .catch((err) => {
      console.log(err);
      contenedorLista.innerHTML = err.message;
    });
}

function mostrarCaricatura(url) {
  contenedorCaricatura.innerHTML = "";
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Caricatura no encontrada");
      return res.json();
    })
    .then((caricatura) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${caricatura.titulo}</h3>
        <p><strong>Descripción:</strong> ${caricatura.descripcion}</p>
        <p><strong>Creador:</strong> ${caricatura.creador}</p>
        <p><strong>Año de creación:</strong> ${caricatura.anioCreacion}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${
          caricatura.lanzamiento || "No especificado"
        }</p>
      `;
      contenedorCaricatura.appendChild(div);
    })
    .catch((err) => {
      console.log(err);
      contenedorCaricatura.innerHTML = err.message;
    });
}

function enviarCaricatura(event) {
  event.preventDefault();
  const form = event.target;

  const body = JSON.stringify({
    titulo: form.elements.titulo.value,
    descripcion: form.elements.descripcion.value,
    creador: form.elements.creador.value,
    anioCreacion: parseInt(form.elements.añoCreacion.value, 10),
    lanzamiento: form.elements.lanzamiento.value || null,
  });

  const headers = { "Content-Type": "application/json" };

  fetch(urlBase, { method: "POST", body, headers })
    .then((res) => {
      if (!res.ok) throw new Error("Error al enviar la caricatura");
      form.reset();
      return res.json();
    })
    .then(() => {
      mensajeEnviar.innerHTML = "<b>Caricatura enviada correctamente.</b>";
      listarCaricaturas();
    })
    .catch((err) => {
      console.log(err);
      mensajeEnviar.innerHTML = "<b>Error al enviar la caricatura.</b>";
    });
}
