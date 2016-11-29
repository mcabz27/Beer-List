DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS beers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);


CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255),
  alc_by_volume VARCHAR (255),
  description VARCHAR (255),
  availability VARCHAR (255),
  style VARCHAR (255)
)
