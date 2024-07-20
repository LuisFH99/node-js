const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT ?? 5000;

app.use(express.json);

// Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase())
    );
    res.json(filteredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body;

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
  };

  // al guardar la nueva pelicula en memoria, deja de ser REST
  // por que estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
