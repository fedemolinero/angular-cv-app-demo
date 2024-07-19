const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo data.json:', err);
    return {};
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Datos escritos correctamente en data.json');
  } catch (err) {
    console.error('Error al escribir en el archivo data.json:', err);
  }
};

module.exports = {
  readData,
  writeData,
};
