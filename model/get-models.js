const db = require("../db/connection");

const getUsersModel = () => {
  return db.query(`SELECT * FROM users;`).then((user) => {
    return user.rows;
  });
};

const getMovieListsModel = () => {
  return db.query(`SELECT * FROM movieLists;`).then((movielists) => {
    return movielists.rows;
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
      return rows;
    });
};

const getMovieFromListModel = (movielist_id, tmdb_movie_id) => {
  return db
    .query(
      "SELECT * FROM movieListItems WHERE movielist_id = $1 AND tmdb_movie_id = $2",
      [movielist_id, tmdb_movie_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = {
  getUsersModel,
  getMovieListsModel,
  selectMovieLists,
  selectMovieListItems,
  getMovieFromListModel,
};
