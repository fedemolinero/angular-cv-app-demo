const jwt = require('jsonwebtoken');
const secretKey = 'fedeKpo';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token expired!' });
      }
      return res.status(500).send({ message: 'Failed to authenticate token!' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
