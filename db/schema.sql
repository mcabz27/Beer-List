DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS beers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255),
  -- fav_beers INTEGER REFERENCES beers
);

CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255),
  alc_by_volume INTEGER,
  description VARCHAR (255),
  availability VARCHAR (255),
  style VARCHAR (255)
);
