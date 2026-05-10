// Importar y configurar el paquete dotenv para manejo de variables de ambiente
require("dotenv").config();

// Importar Express
const express = require("express");

// Importar el paquete path de Node.js
const path = require("path");

// Importar el módulo de caricaturas desde MySQL
const caricaturas = require("./caricaturas-mysql2");

// Inicializar el servidor web
const app = express();

// Configurar carpeta pública
app.use(express.static(path.join(__dirname, "public")));

// Habilitar recepción de datos en formato JSON
app.use(express.json());

// Ruta raíz para enviar index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta GET para obtener todas las caricaturas
app.get("/api/caricaturas", async (req, res) => {
  res.json(await caricaturas.listarCaricaturas());
});

// Ruta GET para obtener una caricatura por ID
app.get("/api/caricaturas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const caricatura = await caricaturas.buscarCaricatura(id);

  if (!caricatura) {
    res.status(404).json({ message: "Caricatura no encontrada" });
  } else {
    res.json(caricatura);
  }
  console.log(caricatura);
});

// Ruta POST para crear una nueva caricatura
app.post("/api/caricaturas", async (req, res) => {
  const { titulo, descripcion, creador, anioCreacion, lanzamiento } = req.body;

  const caricatura = await caricaturas.crearCaricatura(
    titulo,
    descripcion,
    creador,
    anioCreacion,
    lanzamiento,
  );

  if (!caricatura) {
    return res.status(400).json({ message: "Caricatura no creada" });
  }

  res.status(201).json(caricatura);
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({ message: `Error del servidor: ${err}` });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor escuchando peticiones en el puerto 3000...");
});
