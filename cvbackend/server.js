const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secretKey = 'yourSecretKey'; // Cambia esto por una clave secreta más segura si es necesario. En prod no se mostrará.
const port = 3000;
const cvs = [];
let users = []; // Esto es solo para el ejemplo, en un entorno real usarías una base de datos

// Ruta al archivo data.json (asumiendo que está en la misma carpeta)
const dataPath = path.resolve(__dirname, 'data.json');

// Función para leer datos desde el archivo JSON
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo data.json:', err);
    return null;
  }
};

// Función para escribir datos en el archivo JSON
const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Datos escritos correctamente en data.json');
  } catch (err) {
    console.error('Error al escribir en el archivo data.json:', err);
  }
};

// Middleware para verificar el token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token!' });
    }
    req.userId = decoded.id;
    next();
  });
}

// Registro de usuario
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Agregar usuario a la lista
  users.push({ username, password: hashedPassword });

  // Guardar usuarios actualizados en data.json
  writeData({ users });

  res.status(201).send({ message: 'User registered successfully!' });
});

// Login de usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ token: null, message: 'Invalid password!' });
  }

  const token = jwt.sign({ id: user.username }, secretKey, { expiresIn: 86400 }); // 24 horas
  res.status(200).send({ token });
});

// Ruta protegida
app.get('/me', verifyToken, (req, res) => {
  res.status(200).send({ message: `Hello, ${req.userId}!` });
});

// Ruta para crear CV
app.post('/create-cv', (req, res) => {
  const cvData = req.body;
  cvs.push(cvData);
  res.status(201).send(cvData);
});

// Ruta para obtener CV
app.get('/get-cv', (req, res) => {
  // Simplemente devuelve los datos del archivo data.json para esta demostración
  const data = readData();
  if (data) {
    res.send(data);
  } else {
    res.status(500).send({ message: 'Error al obtener los datos del CV' });
  }
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API Running');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
