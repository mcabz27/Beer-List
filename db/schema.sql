DROP TABLE IF EXISTS beers CASCADE;
-- DROP TABLE IF EXISTS usercomment CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name VARCHAR (255),
  alc_by_volume INTEGER,
  description VARCHAR (255),
  availability VARCHAR (255),
  style VARCHAR (255)
);

-- CREATE TABLE usercomment (
--   id SERIAL PRIMARY KEY,
--   -- comment_id INTEGER REFERENCES beers(beer_id),
--   comment VARCHAR (255),
--   -- user_id INTEGER,
--   beer_id INTEGER,
-- );



