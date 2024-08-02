const { readData } = require('../utils/fileHandler');
const { writeData } = require('../utils/fileHandler');

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

const saveCv = (req, res) => {
  const newCv = req.body;

  try {
    let data = readData();

    // Asegúrate de que data sea un objeto
    if (typeof data !== 'object' || Array.isArray(data)) {
      data = {}; // Inicializa como objeto vacío si no es un objeto válido
    }

    // Aquí puedes decidir cómo quieres agregar o actualizar el CV en la estructura del objeto
    // En este ejemplo, estamos reemplazando el CV existente basado en `userEmail`
    // if (data.userEmail === newCv.userEmail) {
    //   data = { ...data, ...newCv };
    // } else {
    //   // Agregar un nuevo CV al objeto, si decides usar una estructura diferente
    //   data = { ...data, ...newCv };
    // }

    writeData(data);

    res.status(201).json({ message: 'CV saved successfully', newCv });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getAllCvIds,
  getCvById,
  saveCv
};
