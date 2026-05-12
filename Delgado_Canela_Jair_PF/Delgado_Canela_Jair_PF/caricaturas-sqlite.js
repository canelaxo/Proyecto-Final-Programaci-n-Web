const sqlite3 = require("sqlite3").verbose();

// Crear "pool" de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Función que regresa el arreglo con las caricaturas
async function listarCaricaturas() {
  try {
    const [results, fields] = await pool.query("SELECT * FROM caricaturas");
    return results;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Función que regresa la caricatura con el id dado; si no existe, regresa null
async function buscarCaricatura(id) {
  try {
    const [results] = await pool.query("SELECT * FROM caricaturas WHERE id=?", [
      id,
    ]);
    if (results.length < 1) {
      return null;
    }
    return results[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Función para crear una nueva caricatura y agregarla a la base de datos
async function crearCaricatura(
  titulo,
  descripcion,
  creador,
  anioCreacion,
  lanzamiento,
) {
  try {
    const [results] = await pool.query(
      "INSERT INTO caricaturas(titulo, descripcion, creador, anioCreacion, lanzamiento) VALUES (?, ?, ?, ?, ?)",
      [titulo, descripcion, creador, anioCreacion, lanzamiento],
    );
    if (results.affectedRows === 1) {
      return await buscarCaricatura(results.insertId);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Exportar las funciones
module.exports = { listarCaricaturas, buscarCaricatura, crearCaricatura };
