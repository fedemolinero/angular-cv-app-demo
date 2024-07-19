const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API Running');
});

// Llamada de ejemplo
// http://localhost:3000/api/cv/get-cv


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
