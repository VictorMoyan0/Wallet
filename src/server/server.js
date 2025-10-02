import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import fs from "fs";

const app = express();
app.use(bodyParser.json());

// Archivo donde vamos a guardar los usuarios
const FILE_PATH = "usuarios.json";

// Cargar usuarios existentes o iniciar vacío
let usuarios = [];
if (fs.existsSync(FILE_PATH)) {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  usuarios = JSON.parse(data);
}

// ------------------- Rutas -------------------

// Registrar usuario
app.post("/registrar", async (req, res) => {
  const { user, passwd } = req.body;

  // Revisar si el usuario ya existe
  if (usuarios.find(u => u.user === user)) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(passwd, 10);

  // Guardar en memoria y en archivo JSON
  usuarios.push({ user, password: hashedPassword });
  fs.writeFileSync(FILE_PATH, JSON.stringify(usuarios, null, 2));

  res.json({ mensaje: "Usuario registrado correctamente" });
});

// Login usuario
app.post("/login", async (req, res) => {
  const { user, passwd } = req.body;

  const usuario = usuarios.find(u => u.user === user);
  if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

  const isMatch = await bcrypt.compare(passwd, usuario.password);
  if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });

  res.json({ mensaje: "Login exitoso" });
});

// ------------------- Servidor -------------------
app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
