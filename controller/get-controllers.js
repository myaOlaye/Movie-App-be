const endPoints = require("../endpoint.json");
const JWT = require("jsonwebtoken");
const {
  getUsersModel,
  getUserModel,
  getMovieListsModel,
  selectMovieLists,
  selectMovieListItems,
  getMovieFromListModel,
  getSharedMovieListModel,
  getMovieListByMovieListIdModel,
} = require("../model/get-models");

const getApi = (req, res, next) => {
  res.status(200).send(endPoints);
};

const getUsers = (req, res) => {
  getUsersModel()
    .then((users) => {
      res
        .status(200)
        .json({ success: true, message: "Users fetched successfully", users });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

const getUser = (req, res, next) => {
  const { username } = req.params;
  getUserModel(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      res.status(404).send({ msg: "Not found" });
    });
};

const getMovieLists = (req, res, next) => {
  getMovieListsModel()
    .then((movielists) => {
      res.status(200).json({
        success: true,
        message: "Movie lists fetched successfully",
        movielists,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

const getMovieListsbyUserId = (req, res, next) => {
  const { owner_id } = req.params;
  const excludedIdsArray = req.query.excluded_movielist_ids
    ? req.query.excluded_movielist_ids.split(",").map(Number)
    : [];

  selectMovieLists(owner_id, excludedIdsArray)
    .then((movieLists) => {
      res.status(200).send({ movieLists });
    })
    .catch((err) => {
      res.send({ err });
    });
};

const getMovieListItems = (req, res, next) => {
  const { movielist_id } = req.params;

  selectMovieListItems(movielist_id)
    .then((movieListItems) => {
      res.status(200).send({ movieListItems });
    })
    .catch((err) => {
      res.send({ err });
    });
};

const getMovieFromList = (req, res, next) => {
  const { movielist_id, tmdb_movie_id } = req.params;

  getMovieFromListModel(movielist_id, tmdb_movie_id)
    .then((movie) => {
      res.status(200).send({ movie });
    })
    .catch((err) => {
      res.send({ err });
    });
};

const getSharedMovieLists = (req, res, next) => {
  const { username } = req.params;

  getSharedMovieListModel(username)
    .then((movieListShares) => {
      res.status(200).send({ movieListShares });
    })
    .catch((err) => {
      res.send({ err });
    });
};

const getMovieListByMovieListId = (req, res, next) => {
  const { movielist_id } = req.params;
  getMovieListByMovieListIdModel(movielist_id)
    .then((movieList) => {
      res.status(200).send({ movieList });
    })
    .catch((err) => {
      res.send({ err });
    });
};

module.exports = {
  getApi,
  getUsers,
  getMovieLists,
  getMovieListsbyUserId,
  getMovieListItems,
  getMovieFromList,
  getSharedMovieLists,
  getMovieListByMovieListId,
  getUser,
};
