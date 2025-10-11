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

// Generar un CBU aleatorio (10 dígitos)
function createCBU() {
  return "CBU" + Math.floor(1000000000 + Math.random() * 9000000000);
}

// Generar alias único (inicial + apellido + 4 dígitos)
function createAlias(firstName, lastName) {
  const number = Math.floor(1000 + Math.random() * 9000); 
  return firstName.charAt(0).toLowerCase() + lastName.toLowerCase() + number;
}

// Generar username (nombre.apellido)
function createUsername(firstName, lastName) {
  return firstName.toLowerCase() + "." + lastName.toLowerCase();
}

// ------------------- Rutas -------------------

// Registrar usuario
app.post("/registrar", async (req, res) => {
  const { firstName, lastName, passwd } = req.body;
  const username = generarUsername(firstName, lastName);
  if (usuarios.find(u => u.user === username)) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }
  const hashedPassword = await bcrypt.hash(passwd, 10);
  const cbu = generarCBU();
  const alias = generarAlias(firstName, lastName);
  usuarios.push({ 
    user: username, 
    password: hashedPassword, 
    balance: 0, 
    cbu, 
    alias, 
    firstName, 
    lastName 
  });
  fs.writeFileSync(FILE_PATH, JSON.stringify(usuarios, null, 2));
  res.json({ 
    mensaje: "Usuario registrado correctamente", 
    user: username, 
    alias, 
    cbu 
  });
});


// Login usuario
app.post("/login", async (req, res) => {
  const { user, passwd } = req.body;
  const usuario = usuarios.find(u => u.user === user);
  if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });
    const isMatch = await bcrypt.compare(passwd, usuario.password);
  if (!isMatch) return res.status(400).json({ error: "Contraseña incorrecta" });
    res.status(200).json({ mensaje: "Login exitoso", user: usuario.user, balance: usuario.balance });
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
