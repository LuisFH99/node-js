import mysql from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';

const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();
      const [idgenre] = await connection.query(
        'SELECT id FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      );

      if (idgenre.length === 0) return [];
      const [{ id }] = idgenre;
      const [movies] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
         FROM movie INNER JOIN movie_genres ON movie.id = movie_genres.movie_id 
         WHERE movie_genres.genre_id = "${id}";`
      );
      return movies;
    }
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
    );

    return movies;
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    return movie;
  }

  static async create ({ input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster,
      genre
    } = input;

    const uuid = randomUUID();

    await connection.query(
      `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
      VALUE (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`,
      [title, year, director, duration, poster, rate]
    );

    genre.map(gen => gen.toLowerCase()).forEach(async nameGen => {
      await connection.query(
        `INSERT INTO movie_genres (movie_id, genre_id) VALUE
        (UUID_TO_BIN("${uuid}"), (SELECT id FROM genre WHERE LOWER(name) = "${nameGen}"))`
      );
    });

    const [movie] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
    );
    return movie;
  }

  static async delete ({ id }) {
    const [movie] = await connection.query(
        `SELECT id AS binUuid 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    );
    if (movie.length === 0) return { message: 'The movie not found' };
    await connection.query(
      'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);',
      [id]
    );
    await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    );

    return { message: 'The movie has deleted' };
  }

  static async update ({ id, input }) {
    const [movie] = await connection.query(
        `SELECT id AS binUuid 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    );
    if (movie.length === 0) return { message: 'The movie not found' };

    const {
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input;

    const fieldUpdate = [];
    const values = [];

    if (title) {
      fieldUpdate.push('title = ?');
      values.push(title);
    }
    if (year) {
      fieldUpdate.push('year = ?');
      values.push(year);
    }
    if (duration) {
      fieldUpdate.push('duration = ?');
      values.push(duration);
    }
    if (director) {
      fieldUpdate.push('director = ?');
      values.push(director);
    }
    if (poster) {
      fieldUpdate.push('poster = ?');
      values.push(poster);
    }
    if (rate) {
      fieldUpdate.push('rate = ?');
      values.push(rate);
    }

    if (fieldUpdate.length === 0) return { message: 'No fields to update' };

    values.push(id);

    await connection.query(
        `UPDATE movie SET ${fieldUpdate.join(', ')} WHERE id = UUID_TO_BIN(?);`,
        values
    );

    const [movieUpdate] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    );

    return movieUpdate;
  }
}
