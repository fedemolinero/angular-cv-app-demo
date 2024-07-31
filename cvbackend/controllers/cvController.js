const { readData } = require('../utils/fileHandler');

const getAllCvIds = (req, res) => {
  try {
    const data = readData();
    const resumeId = data.id;
    const cvName = data.cvName
    res.status(200).json({ resumeId, cvName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCvById = (req, res) => {
  const { id } = req.params;
  try {
    const data = readData();
    if (data.id.toString() === id) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: `CV with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCvIds,
  getCvById,
};
