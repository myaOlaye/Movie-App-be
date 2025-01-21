const express = require("express");
const apiRouter = express.Router();

const usersRouter = require("./users-router");
const movieListRouter = require("./movielists-router");
const movieListItemsRouter = require("./movielistItems-router");
const movieListSharesRouter = require("./movielistShares-router");

const { getApi } = require("../controller/get-controllers");
apiRouter.get("/", getApi);

apiRouter.use("/users", usersRouter);
apiRouter.use("/movielists", movieListRouter);
apiRouter.use("/movielistItems", movieListItemsRouter);
apiRouter.use("/movielistShares", movieListSharesRouter);

module.exports = apiRouter;
