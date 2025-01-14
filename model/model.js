const db = require("../db/connection");
const bcrypt = require("bcrypt");

// Get users model
const getUsersModel = () => {
  return db.query(`SELECT * FROM users;`).then((user) => {
    return user.rows;
  });
};
// Get movie lists model
const getMovieListsModel = () => {
  return db.query(`SELECT * FROM movieLists;`).then((movielists) => {
    return movielists.rows;
  });
};
// Delete movie model
const deleteMovieModel = (id) => {
  return db
    .query(`DELETE FROM movieLists WHERE movielist_id = $1 RETURNING *;`, [id])
    .then((movie) => {
      return movie.rows;
    });
};
// Post register user model
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
// Post login user model
const loginUserModel = () => {
  return db.query(`SELECT * FROM users;`).then((user) => {
    return user.rows;
  });
};

const selectMovieLists = (owner_id) => {
  return db
    .query("SELECT * FROM movieLists WHERE owner_id = $1", [owner_id])
    .then(({ rows }) => {
      return rows;
    });
};

const selectMovieListItems = (movielist_id) => {
  return db
    .query("SELECT * FROM movieListItems WHERE movielist_id = $1", [
      movielist_id,
    ])
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};

module.exports = {
  getUsersModel,
  getMovieListsModel,
  registerUserModel,
  loginUserModel,
  deleteMovieModel,
  selectMovieLists,
  selectMovieListItems,
};
