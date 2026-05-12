const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./caricaturas.db", (err) => {
  if (err) {
    console.error("Error al conectar SQLite:", err.message);
  } else {
    console.log("Conectado a SQLite");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS caricaturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descripcion TEXT,
      creador TEXT,
      añoCreacion INTEGER,
      lanzamiento TEXT
    )
  `);
});

module.exports = db;
