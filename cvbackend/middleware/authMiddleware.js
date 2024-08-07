const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno

const secretKey = process.env.SECRET_KEY || 'default_secret_key'; // Usar clave secreta del entorno

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id; // Guardar el id del usuario en la solicitud
    next();
  });
};

module.exports = {
  verifyToken,
};
