const { readData } = require('../utils/fileHandler');

const createCv = (req, res) => {
  const cvData = req.body;
  const cvs = readData().cvs || [];
  cvs.push(cvData);
  writeData({ cvs });
  res.status(201).send(cvData);
};

const getCv = (req, res) => {
  const data = readData();
  if (data) {
    res.send(data);
  } else {
    res.status(500).send({ message: 'Error al obtener los datos del CV' });
  }
};

// Implementación para obtener un CV por ID
const getCvById = (req, res) => {
  const { cvId } = req.params;
  const data = readData();
  const cvs = data.cvs || [];

  const cv = cvs.find(cv => cv.id === cvId); // Suponiendo que cada CV tiene un campo 'id'

  if (cv) {
    res.status(200).send(cv);
  } else {
    res.status(404).send({ message: `CV with ID ${cvId} not found` });
  }
};

module.exports = {
  createCv,
  getCv,
  getCvById,
};
