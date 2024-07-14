const express = require('express');
const ditto = require('./pokemon/ditto.json');
const app = express();
app.disable('x-powered-by');
const PORT = 5000;

app.use(express.json());
// especifico -> ('/', '/pokemon/*')
// afecta a todo
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next();
//   if (req.headers['content-type'] !== 'application/json') return next();
//   // aqui llegan solo request POST y que tiene el header Content-Type: applicatión/json.
//   let body = '';

//   req.on('data', chunk => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     req.body = data;
//     next();
//   });
// });

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
