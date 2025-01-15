const express = require("express");
const movieListRouter = express.Router();

const {
  getMovieLists,
  getMovieListsbyUserId,
} = require("../controller/get-controllers");
const {
  deleteMovie,
  deleteMovieList,
} = require("../controller/delete-controllers");

movieListRouter.route("/").get(getMovieLists);
movieListRouter.route("/:movielist_id/:tmdb_movie_id").delete(deleteMovie);
movieListRouter.route("/:movielist_id").delete(deleteMovieList);
movieListRouter.route("/:owner_id").get(getMovieListsbyUserId);

module.exports = movieListRouter;
