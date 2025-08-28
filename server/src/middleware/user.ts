import { Response, NextFunction } from "express";
import pool from "../db/db";
import { QueryResult } from "pg";
import { User } from "../../../shared/types";
import { UserRequest } from "../types/express";

export const ensureUserExists = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  if (!username || typeof username !== "string") {
    return res
      .status(400)
      .json({ error: "Username is required and must be a string." });
  }

  try {
    const userResult: QueryResult<User> = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    let userId: number;

    if (userResult.rows.length > 0) {
      userId = userResult.rows[0].id;
    } else {
      const newUserResult: QueryResult<User> = await pool.query(
        "INSERT INTO users (username) VALUES ($1) RETURNING id",
        [username]
      );
      userId = newUserResult.rows[0].id;
    }

    req.userId = userId;
    next();
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to process user." });
  }
};
