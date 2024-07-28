import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createMovieRouter } from './routes/movies.js';

import 'dotenv/config';

export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  const PORT = process.env.SERVER_PORT ?? 3000;

  app.use('/movies', createMovieRouter({ movieModel }));

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
  });
};
