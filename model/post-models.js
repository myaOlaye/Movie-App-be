const db = require("../db/connection");
const bcrypt = require("bcrypt");

const registerUserModel = (reqBody) => {
  const { name, username, email, password, image } = reqBody;
  return bcrypt.hash(password, 10).then((hashPassword) => {
    return db
      .query(
        `INSERT INTO users (name, username, email, password_hash, profile_img) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [name, username, email, hashPassword, image]
      )
      .then((user) => {
        return user.rows;
      });
  });
};

const loginUserModel = () => {
  return db.query(`SELECT * FROM users;`).then((user) => {
    return user.rows;
  });
};

const postMovieToListModel = (movielist_id, tmdb_movie_id, notes) => {
  return db
    .query(
      `INSERT INTO movielistItems (movielist_id,tmdb_movie_id, notes) VALUES ($1, $2, $3) RETURNING *;`,
      [movielist_id, tmdb_movie_id, notes]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const createMovieListModel = (owner_id, name) => {
  return db
    .query(
      "INSERT INTO movieLists (owner_id, name) VALUES ($1, $2) RETURNING *;",
      [owner_id, name]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const shareMovieListModel = (
  movielist_id,
  owner_username,
  receiver_username
) => {
  return db
    .query(
      `INSERT INTO movieListShares (movielist_id, owner_username,receiver_username, status) VALUES ($1, $2, $3,'pending') RETURNING *;`,
      [movielist_id, owner_username, receiver_username]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = {
  registerUserModel,
  loginUserModel,
  postMovieToListModel,
  createMovieListModel,
  shareMovieListModel,
};
