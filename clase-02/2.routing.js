const http = require('node:http');

const dittoJson = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'text/json; charset=utf-8');
          return res.end(JSON.stringify(dittoJson));
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';

          /* el body de la request llega en la variable data y
          llega en partes de forma progresiva
          */
          req.on('data', chunk => {
            body += chunk.toString();
          });

          // termina el proceso de recibir el body
          req.on('end', () => {
            const data = JSON.parse(body);
            data.timestamp = Date.now();
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
          });
          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end('<h1>404</h1>');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(5000, () => {
  console.log(`Servidor escuchando en el puerto: http://localhost:${5000}`);
});
