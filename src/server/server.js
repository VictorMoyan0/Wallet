import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import fs from "fs";
import cors from "cors";

const app = express();
// Permite que React (u otro origen) haga peticiones al backend
app.use(cors()); // 👈 va antes de las rutas
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
  //Crea un nuevo usuario con saldo 0
  usuarios.push({ user, password: hashedPassword, balance: 0 });
  // Guardar usuarios en el archivo
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

  res.status(200).json({ mensaje: "Login exitoso", user: usuario.user });
});

// Deposito usuario
app.post("/deposit", (req, res) => {
  const { user, amount } = req.body;
  if (!user || !amount || isNaN(amount)) {
    return res.status(400).json({ error: "Monto inválido o usuario faltante" });
  }
  const usuario = usuarios.find(u => u.user === user);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    usuario.balance += parseFloat(amount);
    // Guardar cambios en archivo JSON
    fs.writeFileSync(FILE_PATH, JSON.stringify(usuarios, null, 2));
    res.json({ message: "Depósito exitoso", balance: usuario.balance });
});
// ------------------- Servidor -------------------
app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
