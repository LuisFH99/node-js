const http = require('node:http');

const desiredPort = process.env.PORT ?? 5000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (req.url === '/') {
    res.end('<h1>Bienvenido a mi página de Inicio</h1>');
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 No Encontrado</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${desiredPort}`);
});
