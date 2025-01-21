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

// when testing for owner_id 1 here (sanderson), movielist of id 1 should NOT be included, working fine
const selectMovieLists = (owner_id, excludedIdsArray) => {
  return db
    .query(
      `SELECT * FROM movieLists WHERE owner_id = $1 
     ${
       excludedIdsArray.length > 0
         ? `AND movielist_id NOT IN (${excludedIdsArray
             .map((_, idx) => `$${idx + 2}`)
             .join(", ")})`
         : ""
     }`,
      [owner_id, ...excludedIdsArray]
    )
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

const getSharedMovieListModel = (username) => {
  return db
    .query(
      "SELECT * FROM movieListShares WHERE owner_username = $1 OR receiver_username = $1",
      [username]
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
  getSharedMovieListModel,
};
