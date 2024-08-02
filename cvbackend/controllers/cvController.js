const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../cv-saved');  // Asegúrate de que la ruta sea correcta

const getAllCvIds = (req, res) => {
  try {
    const files = fs.readdirSync(dataPath);
    const cvIds = files.map(file => parseInt(path.basename(file, '.json')));
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

  // Validate input
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



module.exports = {
  getAllCvIds,
  getCvById,
  saveCv
};
