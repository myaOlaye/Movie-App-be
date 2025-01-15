const db = require("../db/connection");

const deleteMovieModel = (tmdb_movie_id, movielist_id) => {
  return db
    .query(
      `DELETE FROM movieListItems WHERE tmdb_movie_id = $1 AND movielist_id = $2 RETURNING *;`,
      [tmdb_movie_id, movielist_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

const deleteMovieListModel = (movielist_id) => {
  return db
    .query(`DELETE FROM movieLists WHERE movielist_id = $1 RETURNING *;`, [
      movielist_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { deleteMovieModel, deleteMovieListModel };
