// index.js
import express from 'express';
import cors from 'cors';
import { validateDPI, validateEmail, validatePassword } from './utils.js';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

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

app.get('/users', (req, res) => {
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

app.put('/users/:dpi', (req, res) => {
  const { dpi } = req.params;
  const { name, email, password } = req.body;

  const userIndex = users.findIndex(user => user.dpi === dpi);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (email && users.some(user => user.email === email && user.dpi !== dpi)) {
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

app.delete('/users/:dpi', (req, res) => {
  const { dpi } = req.params;
  const userIndex = users.findIndex(user => user.dpi === dpi);

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