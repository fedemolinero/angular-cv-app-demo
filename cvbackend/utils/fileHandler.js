const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error.message);
    return {};
  }
};

module.exports = {
  readData,
};
