const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Asegúrate de que 'uuid' esté instalado

const dataPath = path.resolve(__dirname, '../cv-saved');  // Asegúrate de que la ruta sea correcta

const getAllCvIds = (req, res) => {
  try {
    const files = fs.readdirSync(dataPath);
    const cvIds = files.map(file => path.basename(file, '.json'));
    res.status(200).json({ cvIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCvById = (req, res) => {
  const { id } = req.params;
  
  const filePath = path.join(dataPath, `${id}.json`);

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } else {
      res.status(404).json({ message: `CV with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveCv = (req, res) => {
  const cvData = req.body;

  // Validar entrada
  if (!cvData || !cvData.id) {
    return res.status(400).json({ message: 'Invalid CV data' });
  }

  const filePath = path.join(dataPath, `${cvData.id}.json`);

  try {

    fs.writeFileSync(filePath, JSON.stringify(cvData, null, 2), 'utf8');
    res.status(201).json({ message: 'CV saved successfully', cvData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nueva función para crear un nuevo CV si no existe ninguno
const createNewCv = (req, res) => {
  try {
    const files = fs.readdirSync(dataPath);

    if (files.length > 3) {
      return res.status(400).json({ message: '3 CV already exists. Memory costs, buy me a beer' });
    }

    const newId = uuidv4();
    const newCvData = { ...req.body, id: newId };
    const filePath = path.join(dataPath, `${newId}.json`);

    fs.writeFileSync(filePath, JSON.stringify(newCvData, null, 2), 'utf8');
    res.status(201).json({ message: 'New CV created successfully', newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCvIds,
  getCvById,
  saveCv,
  createNewCv,
};
