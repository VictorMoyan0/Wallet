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
  return Math.floor(1000000000 + Math.random() * 9000000000);
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

app.post("/register", async (req, res) => {
  const { firstName, lastName, passwd } = req.body;
  const username = createUsername(firstName, lastName);
  if (usuarios.find(u => u.user === username)) {
    return res.status(400).json({ error: "Usuario ya existe" });
  }
  const hashedPassword = await bcrypt.hash(passwd, 10);
  const cbu = createCBU();
  const alias = createAlias(firstName, lastName);
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

// Obtener saldo actual del usuario

app.post("/balance", (req, res) => {
  const { user } = req.body;
  const usuario = usuarios.find(u => u.user === user);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json({ balance: usuario.balance });
});

// Transferir dinero entre usuarios

app.post("/transfer", (req, res) => {
  const { fromUser, to, amount } = req.body;

  if (!fromUser || !to || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const remitente = usuarios.find(u => u.user === fromUser);
  if (!remitente) return res.status(404).json({ error: "Remitente no encontrado" });

  // Buscar destinatario por alias o CBU
  const destinatario = usuarios.find(
    u => u.alias === to || u.cbu.toString() === to
  );
  if (!destinatario) {
    return res.status(404).json({ error: "Destinatario no encontrado" });
  }

  if (remitente.user === destinatario.user) {
    return res.status(400).json({ error: "No puedes transferirte a ti mismo" });
  }

  if (remitente.balance < amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  // Realizar transferencia
  remitente.balance -= parseFloat(amount);
  destinatario.balance += parseFloat(amount);

  // Guardar cambios en archivo
  fs.writeFileSync(FILE_PATH, JSON.stringify(usuarios, null, 2));

  res.json({
    message: "Transferencia exitosa",
    nuevoSaldo: remitente.balance,
    destino: { user: destinatario.user, alias: destinatario.alias, cbu: destinatario.cbu },
  });
});

// ------------------- Servidor -------------------
app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
