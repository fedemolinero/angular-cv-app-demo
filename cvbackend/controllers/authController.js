const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readData, writeData } = require('../utils/fileHandler');

const secretKey = 'fedeKpo';

const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required!' });
  }

  const users = readData().users || [];

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).send({ message: 'Username already exists!' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  writeData({ users });

  res.status(201).send({ message: 'User registered successfully!' });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const users = readData().users || [];

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({ token: null, message: 'Invalid password!' });
  }

  const token = jwt.sign({ id: user.username }, secretKey, { expiresIn: 86400 });
  res.status(200).send({ token });
};

module.exports = {
  register,
  login,
};
