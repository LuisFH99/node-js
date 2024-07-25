import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { movieRouter } from './routes/movies.js';
import 'dotenv/config';

// EN EL FUTURO: El import del json será asi:
// import movies from './movies.js' with { type: 'json' };

/*
  como leer un json en ESModule
  import fs from 'node:fs';
  const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));
*/

// como leer un json recomendado por ahora

// const movies = readJSON('./movies.json');

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

const PORT = process.env.SERVER_PORT ?? 3000;

app.use('/movies', movieRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
