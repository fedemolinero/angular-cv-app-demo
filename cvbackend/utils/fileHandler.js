const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../cvdata.json');
const usersPath = path.resolve(__dirname, '../registerdata.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo de usuarios register.json:', err);
    return {};
  }
};

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo de datos data.json:', err);
    return {};
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(registerPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Datos escritos correctamente en data.json');
  } catch (err) {
    console.error('Error al escribir en el archivo data.json:', err);
  }
};

const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Datos escritos correctamente en data.json');
  } catch (err) {
    console.error('Error al escribir en el archivo data.json:', err);
  }
};

module.exports = {
  readData,
  readUsers,
  writeUsers,
  writeData,
};
