CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(10),
  runtime VARCHAR(20),
  genre VARCHAR(255),
  director VARCHAR(255),
  is_favorite BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX movies_title_user_id_idx ON movies (title, user_id);
