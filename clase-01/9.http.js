const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log('solicitud recibida');
  res.end('Hola mundo');
});

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${server.address().port}`);
  });
});

// server.listen(0, () => {
//   console.log(`Servidor escuchando en el puerto: http://localhost:${server.address().port}`);
// });
