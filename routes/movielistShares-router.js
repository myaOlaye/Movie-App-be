const express = require("express");
const movieListSharesRouter = express.Router();

const { getSharedMovieLists } = require("../controller/get-controllers");
const { shareMovieList } = require("../controller/post-controllers");
const { respondToShareRequest } = require("../controller/patch-controllers.js");
movieListSharesRouter.route("/:username").get(getSharedMovieLists);
movieListSharesRouter.route("/").post(shareMovieList);
movieListSharesRouter.route("/:share_id").patch(respondToShareRequest);

module.exports = movieListSharesRouter;
