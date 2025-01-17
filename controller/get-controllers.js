const endPoints = require("../endpoint.json");
const JWT = require("jsonwebtoken");
const {
  getUsersModel,
  getMovieListsModel,
  selectMovieLists,
  selectMovieListItems,
  getMovieFromListModel,
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

  selectMovieLists(owner_id)
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


module.exports = {
  getApi,
  getUsers,
  getMovieLists,
  getMovieListsbyUserId,
  getMovieListItems,
  getMovieFromList
};
