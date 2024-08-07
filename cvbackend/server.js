const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const port = 3000;

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API Running');
});

// Example call:
// ALL: http://localhost:3000/api/cv/get-cv/
// ID: http://localhost:3000/api/cv/get-cv/258139



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});