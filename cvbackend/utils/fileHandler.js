const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../cvdata.json'); // Ruta del archivo de CV
const usersPath = path.resolve(__dirname, '../registerdata.json'); // Ruta del archivo de usuarios
// const dataPath = path.join(__dirname, '../cvdata.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo de usuarios registerdata.json:', err);
    return [];
  }
};

// Lee el archivo JSON y convierte su contenido en un objeto
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(data);
    if (typeof parsedData !== 'object' || Array.isArray(parsedData)) {
      console.warn('El archivo cvdata.json no contiene un objeto válido. Se ha inicializado como un objeto vacío.');
      return {};
    }
    return parsedData;
  } catch (err) {
    console.error('Error al leer el archivo de datos cvdata.json:', err);
    return {};
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al escribir en el archivo cvdata.json:', err);
  }
};

const writeUsers = (data) => {
  try {
    fs.writeFileSync(usersPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Datos escritos correctamente en registerdata.json');
  } catch (err) {
    console.error('Error al escribir en el archivo registerdata.json:', err);
  }
};

module.exports = {
  readData,
  readUsers,
  writeUsers,
  writeData,
};
