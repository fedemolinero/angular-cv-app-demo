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
    res.status(201).json({ message: 'CV saved successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Nueva función para crear un nuevo CV si no existe ninguno

/**
* Valida el nombr
* e del archivo.
* @param {string} fileName - Nombre del archivo a validar.
* @returns {boolean} - Retorna `true` si el nombre es válido, `false` en caso contrario.
*/

const createNewCv = (req, res) => {

  const { filename } = req.body;

  try {

    if (typeof filename !== 'string' || filename.trim() === '') {
      return res.status(400).json({ error: 'Invalid fileName. It must be a non-empty string and contain only alphanumeric characters, hyphens, underscores, and periods.' });
    }

    // Limpia el nombre del archivo para evitar caracteres no permitidos
    const sanitizedFileName = filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');

    // Busca nombres de archivo y los transforma en numeros para guardar el proximo
    // aqui lee los archivos de la carpeta y busca todos los ids
    // retorna ids, busca el mas alto y devuelve ese
    // como es un string lo convierte a numero y le suma uno
    // const files = fs.readdirSync(dataPath);
    // const cvIds = files.map(file => path.basename(file, '.json'));
    // que puede decirse asi tambien:

    // Lee los archivos del directorio actual
    const files = fs.readdirSync(dataPath);
    // Extrae y convierte los IDs de los archivos .json
    const cvIds = files
      .filter(file => file.endsWith('.json')) // Filtra solo archivos .json
      .map(file => path.basename(file, '.json')) // Extrae el nombre base sin extensión
      .map(id => parseInt(id, 10)) // Convierte a números
      .filter(id => !isNaN(id)); // Filtra valores NaN

    // Encuentra el ID máximo y calcula el siguiente ID
    const maxIdNumber = cvIds.length > 0 ? Math.max(...cvIds) + 1 : 1;


    // Define el path del archivo con el ID generado
    const filePath = path.join(dataPath, `${maxIdNumber}.json`);

    // Crea el archivo vacío
    fs.writeFile(filePath, JSON.stringify({
      id: maxIdNumber,
      resumeId: maxIdNumber,
      cvName: sanitizedFileName
    }), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating file' });
      }
      res.status(201).json({ message: 'File created successfully', filePath, newId: maxIdNumber });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const deleteCv = (req, res) => {

  const { id } = req.params; // Asume que el ID se pasa como un parámetro en la URL

  try {
    // Verifica que el ID es un número entero positivo
    const cvId = parseInt(id, 10);
    if (isNaN(cvId) || cvId <= 0) {
      return res.status(400).json({ error: 'Invalid ID. It must be a positive integer.' });
    }

    // Define el path del archivo a borrar
    const filePath = path.join(dataPath, `${cvId}.json`);

    // Verifica si el archivo existe antes de intentar eliminarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('File does not exist:', err);
        return res.status(404).json({ error: 'File not found' });
      }

      // Elimina el archivo
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ error: 'Error deleting file' });
        }

        // Responde con éxito si el archivo se eliminó correctamente
        res.status(200).json({ message: 'File deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Caught exception:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllCvIds,
  getCvById,
  saveCv,
  deleteCv,
  createNewCv,
};
