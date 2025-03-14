const express = require("express");
const movieListRouter = express.Router();

const {
  getMovieLists,
  getMovieListsbyUserId,
  getMovieListByMovieListId,
} = require("../controller/get-controllers");
const {
  deleteMovie,
  deleteMovieList,
} = require("../controller/delete-controllers");

const { createMovieList } = require("../controller/post-controllers");

movieListRouter.route("/").get(getMovieLists).post(createMovieList);
movieListRouter.route("/:movielist_id/:tmdb_movie_id").delete(deleteMovie);
movieListRouter.route("/:movielist_id").delete(deleteMovieList);

movieListRouter.route("/:owner_id").get(getMovieListsbyUserId);

movieListRouter
  .route("/movielistid/:movielist_id")
  .get(getMovieListByMovieListId);

module.exports = movieListRouter;
