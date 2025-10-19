// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { validateDPI, validateEmail, validatePassword } from './utils.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user; // user contiene el payload del token
    next();
  });
};

// Endpoint de login para obtener JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son obligatorios' });
  }

  // Buscar usuario por email
  const existingUser = users.find(u => u.email === email);
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const payload = { id: existingUser.id, email: existingUser.email, dpi: existingUser.dpi };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '30s' });
  res.json({ token, expiresIn: process.env.JWT_EXPIRES || '30s' });
});

app.post('/users', (req, res) => {
  const { name, email, password, dpi } = req.body;

  if (!name || !email || !password || !dpi) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (!validateDPI(dpi)) {
    return res.status(400).json({ error: 'El DPI debe tener exactamente 13 dígitos numéricos' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'El formato del email no es válido' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo' });
  }

  if (users.some(user => user.dpi === dpi)) {
    return res.status(409).json({ error: 'El DPI ya está registrado' });
  }

  if (users.some(user => user.email === email)) {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    dpi
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Proteger: Listar usuarios
app.get('/users', authenticateToken, (req, res) => {
  let filteredUsers = [...users];

  const { name, email, limit, offset } = req.query;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (email) {
    filteredUsers = filteredUsers.filter(user => user.email === email);
  }

  const paginatedUsers = filteredUsers.slice(offset || 0, (offset || 0) + (limit || 10));

  const usersWithoutPassword = paginatedUsers.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  res.json(usersWithoutPassword);
});

// Proteger: Actualizar usuario (acepta DPI de 13 dígitos o ID numérico)
app.put('/users/:id', authenticateToken, (req, res) => {
  const param = req.params.id;
  const { name, email, password } = req.body;

  const isDPI = /^[0-9]{13}$/.test(param);
  const isID = /^\d+$/.test(param);

  let userIndex = -1;
  if (isDPI) {
    userIndex = users.findIndex(user => user.dpi === param);
  } else if (isID) {
    userIndex = users.findIndex(user => user.id === parseInt(param, 10));
  }

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (email && users.some(user => user.email === email && user.id !== users[userIndex].id)) {
    return res.status(409).json({ error: 'El email ya está en uso por otro usuario' });
  }

  if (name) {
    users[userIndex].name = name;
  }

  if (email) {
    users[userIndex].email = email;
  }

  if (password) {
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo' });
    }
    users[userIndex].password = password;
  }

  res.json(users[userIndex]);
});

// Proteger: Eliminar usuario (acepta DPI de 13 dígitos o ID numérico)
app.delete('/users/:id', authenticateToken, (req, res) => {
  const param = req.params.id;
  const isDPI = /^[0-9]{13}$/.test(param);
  const isID = /^\d+$/.test(param);

  let userIndex = -1;
  if (isDPI) {
    userIndex = users.findIndex(user => user.dpi === param);
  } else if (isID) {
    userIndex = users.findIndex(user => user.id === parseInt(param, 10));
  }

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});