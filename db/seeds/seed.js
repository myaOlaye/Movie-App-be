const db = require("../connection");
const format = require("pg-format");

const seed = ({
  usersData,
  movieListsData,
  movieListItemsData,
  movieListShareData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS movieListShares ;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS movieListItems ;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS movieLists ;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users ;`);
    })
    .then(() => {
      return db.query(`DROP TYPE IF EXISTS share_status;`);
    })
    .then(() => {
      return db.query(`
        CREATE TYPE share_status AS ENUM ('pending', 'accepted', 'declined');
      `);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              name VARCHAR(255) not null,
              username VARCHAR(50) not null UNIQUE ,
              email VARCHAR(255) not null UNIQUE,
              password_hash VARCHAR not null,
              profile_img VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
              created_at TIMESTAMP DEFAULT NOW()
            );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE movieLists (
          movielist_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          owner_id INT REFERENCES users(user_id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE movieListItems (
          tmdb_movie_id INT NOT NULL,
          movielist_id INT REFERENCES movieLists(movielist_id) ON DELETE CASCADE,
          added_at TIMESTAMP DEFAULT NOW(),
          notes VARCHAR
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE movieListShares (
         share_id SERIAL PRIMARY KEY,
          movielist_id INT REFERENCES movieLists(movielist_id) ON DELETE CASCADE,
          owner_username VARCHAR REFERENCES users(username) ON DELETE CASCADE,
          receiver_username VARCHAR REFERENCES users(username) ON DELETE CASCADE,
          status share_status NOT NULL,
          shared_at TIMESTAMP DEFAULT NOW()
        );`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (name, username, email, password_hash, profile_img, created_at) VALUES %L",
        usersData.map(
          ({ name, username, email, password_hash, profile_img, created_at }) => [
            name,
            username,
            email,
            password_hash,
            profile_img,
            created_at,
          ]
        )
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertMovieListsQueryStr = format(
        "INSERT INTO movieLists (owner_id, name) VALUES %L",
        movieListsData.map(({ owner_id, name }) => [owner_id, name])
      );
      return db.query(insertMovieListsQueryStr);
    })
    .then(() => {
      const insertMovieListItemsQueryStr = format(
        "INSERT INTO movieListItems (tmdb_movie_id, movielist_id, notes) VALUES %L",
        movieListItemsData.map(({ tmdb_movie_id, movielist_id, notes }) => [
          tmdb_movie_id,
          movielist_id,
          notes,
        ])
      );
      return db.query(insertMovieListItemsQueryStr);
    })
    .then(() => {
      const insertMovieListSharesQueryStr = format(
        "INSERT INTO movieListShares (movielist_id, owner_username, receiver_username, status) VALUES %L",
        movieListShareData.map(
          ({ movielist_id, owner_username, receiver_username, status }) => [
            movielist_id,
            owner_username,
            receiver_username,
            status,
          ]
        )
      );
      return db.query(insertMovieListSharesQueryStr);
    });
};

module.exports = seed;
