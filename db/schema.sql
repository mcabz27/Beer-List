DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS beers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

-- REFERENCE USER ID
CREATE TABLE usercomment(
  id SERIAL PRIMARY KEY,
  -- comment_id INTEGER REFERENCES users(id),
  comment VARCHAR (255)
)



 -- beer id VARCHAR (255) REFERENCES BEER(id)
CREATE TABLE beers (
  id SERIAL PRIMARY KEY,
  -- beer_id INTEGER REFERENCES usercomment(comment_id)
  name VARCHAR (255),
  alc_by_volume VARCHAR (255),
  description VARCHAR (255),
  availability VARCHAR (255),
  style VARCHAR (255)
)

