const express = require("express");
const movieListItemsRouter = express.Router();

const {
  getMovieListItems,
  getMovieFromList,
} = require("../controller/get-controllers");
const { postMovieToList } = require("../controller/post-controllers");

movieListItemsRouter.route("/:movielist_id").get(getMovieListItems);
movieListItemsRouter.route("/").post(postMovieToList);
movieListItemsRouter
  .route("/:movielist_id/:tmdb_movie_id")
  .get(getMovieFromList);

module.exports = movieListItemsRouter;
