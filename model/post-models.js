const db = require("../db/connection");
const bcrypt = require("bcrypt");

const registerUserModel = (reqBody) => {
  const { name, email, password, image } = reqBody;
  return bcrypt.hash(password, 10).then((hashPassword) => {
    return db
      .query(
        `INSERT INTO users (username,email, password_hash, profile_img) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [name, email, hashPassword, image]
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

module.exports = { registerUserModel, loginUserModel, postMovieToListModel };
