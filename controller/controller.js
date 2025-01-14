const endPoints = require("../endpoint.json");
const bcrypt = require("bcrypt");
const {
  getUsersModel,
  getMovieListsModel,
  registerUserModel,
  loginUserModel,
  deleteMovieModel,
  selectMovieLists,
  selectMovieListItems,
} = require("../model/model");
// Get'/api'
const getApi = (req, res, next) => {
  res.status(200).send(endPoints);
};
// Get'/api/users'
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
// Get'/api/movielists'
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
// Delete'/api/movielists/:id'
const deleteMovie = (req, res, next) => {
  const id = req.params.id;
  deleteMovieModel(id)
    .then((movie) => {
      res
        .status(200)
        .json({ success: true, message: "Movie deleted successfully", movie });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

// Post'/api/users/register'
const registerUser = (req, res, next) => {
  const reqBody = req.body;
  registerUserModel(reqBody).then((user) => {
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  });
};

// Post'/api/users/login'
const loginUser = (req, res) => {
  const { email, password } = req.body;
  loginUserModel()
    .then((users) => {
      const findUser = users.find((user) => user.email === email);
      console.log(findUser);

      if (!findUser) {
        return res
          .status(404)
          .json({ success: false, message: "Sorry user not found" });
      }
      bcrypt.compare(password, findUser.password_hash, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: findUser,
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Incorrect password" });
        }
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

module.exports = {
  getApi,
  getUsers,
  getMovieLists,
  deleteMovie,
  registerUser,
  loginUser,
  getMovieListsbyUserId,
  getMovieListItems,
};
