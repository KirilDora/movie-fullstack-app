import { Response, Router } from "express";
import { QueryResult } from "pg";
import type { Movie, User } from "./../../../shared/types";
import pool from "../db/db";
import { ensureUserExists } from "../middleware/user";
import { UserRequest } from "../types/express";

const movieRouter = Router();

movieRouter.put("/toggle-favorite", async (req: UserRequest, res: Response) => {
  try {
    const movie = req.body;
    const { userId } = req.body;
    const existingMovieResult = await pool.query(
      "SELECT * FROM movies WHERE user_id = $1 AND title = $2 AND year = $3",
      [userId, movie.title, movie.year]
    );

    if (existingMovieResult.rows.length > 0) {
      const existingMovieId = existingMovieResult.rows[0].id;
      const updatedMovie = await pool.query(
        "UPDATE movies SET is_favorite = $1 WHERE id = $2 RETURNING *",
        [!movie.is_favorite, existingMovieId]
      );
      res.json(updatedMovie.rows[0]);
    } else {
      const newMovie = await pool.query(
        "INSERT INTO movies (title, year, runtime, genre, director, is_favorite, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          movie.title,
          movie.year,
          movie.runtime,
          movie.genre,
          movie.director,
          true,
          userId,
        ]
      );
      res.status(201).json(newMovie.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error happened" });
  }
});

movieRouter.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const userResult: QueryResult<User> = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const userId = userResult.rows[0].id;
    const moviesResult: QueryResult<Movie> = await pool.query(
      "SELECT * FROM movies WHERE user_id = $1",
      [userId]
    );
    res.json(moviesResult.rows);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Failed to retrieve movies." });
  }
});

movieRouter.post(
  "/",
  ensureUserExists,
  async (req: UserRequest, res: Response) => {
    const { title, year, runtime, genre, director } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    try {
      const movieResult: QueryResult<Movie> = await pool.query(
        "INSERT INTO movies (title, year, runtime, genre, director, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, year, runtime, genre, director, userId]
      );
      res.status(201).json(movieResult.rows[0]);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === "23505"
      ) {
        return res
          .status(409)
          .json({ error: "A movie with the same name already exists." });
      }
      console.error("Error adding movie:", err);
      res.status(500).json({ error: "Failed to add movie." });
    }
  }
);

movieRouter.put(
  "/:id",
  ensureUserExists,
  async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;
    const { title, year, runtime, genre, director, is_favorite } = req.body;

    try {
      const movieResult: QueryResult<Movie> = await pool.query(
        "UPDATE movies SET title = $1, year = $2, runtime = $3, genre = $4, director = $5, is_favorite = $6 WHERE id = $7 AND user_id = $8 RETURNING *",
        [title, year, runtime, genre, director, is_favorite, id, userId]
      );

      if (movieResult.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Movie not found or does not belong to the user." });
      }

      res.json(movieResult.rows[0]);
    } catch (err) {
      console.error("Error updating movie:", err);
      res.status(500).json({ error: "Failed to update movie." });
    }
  }
);

movieRouter.delete(
  "/:id",
  ensureUserExists,
  async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const deleteResult = await pool.query(
        "DELETE FROM movies WHERE id = $1 AND user_id = $2 RETURNING id",
        [id, userId]
      );

      if (deleteResult.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Movie not found or does not belong to the user." });
      }

      res.json({ message: "Movie deleted successfully." });
    } catch (err) {
      console.error("Error deleting movie:", err);
      res.status(500).json({ error: "Failed to delete movie." });
    }
  }
);

export { movieRouter };
