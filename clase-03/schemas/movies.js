const validate = require('zod');

const movieSchema = validate.object({
  title: validate.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: validate.number().int().min(1900).max(2025),
  director: validate.string(),
  duration: validate.number().int().positive(),
  rate: validate.number().min(0).max(10).default(5),
  poster: validate.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: validate.array(
    validate.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre.'
    }
  )
});

function validateMovie (input) {
  return movieSchema.safeParse(input); // devuelve si hay error o hay dato, podemos validar con un fi
}

function validateParcialMovie (input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = {
  validateMovie,
  validateParcialMovie
};
