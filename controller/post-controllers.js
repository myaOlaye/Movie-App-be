const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {
  registerUserModel,
  loginUserModel,
  postMovieToListModel,
  createMovieListModel,
} = require("../model/post-models");

const registerUser = (req, res, next) => {
  const reqBody = req.body;
  registerUserModel(reqBody).then((user) => {
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  loginUserModel()
    .then((users) => {
      const findUser = users.find((user) => user.email === email);

      if (!findUser) {
        return res
          .status(404)
          .json({ success: false, message: "Sorry user not found" });
      }
      bcrypt.compare(password, findUser.password_hash, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            const token = JWT.sign({ email: findUser.email, username:findUser.username, user_id: findUser.user_id, image: findUser.profile_img}, 'ehan', { expiresIn: "1h" }) 
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: findUser,
            token: token
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

const postMovieToList = (req, res, next) => {
  const { movielist_id, tmdb_movie_id, notes = null } = req.body;
  postMovieToListModel(movielist_id, tmdb_movie_id, notes)
    .then((addedMovie) => {
      res.status(201).json({
        success: true,
        message: `Movie ${tmdb_movie_id} added to Movie list ${movielist_id} successfully`,
        addedMovie,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};
const authotization = (req, res, next) => {
  const {token} = req.body
  if (!token) {
    return res.json({ success: false, msg: "Sorry Access Denied" });
  }
  const decode = JWT.verify(token, 'ehan');
  res
    .status(201)
    .json({ success: true, msg: "Thank you for verification", decode });
  next();
};
module.exports = { registerUser, loginUser, postMovieToList,authotization };


const createMovieList = (req, res, next) => {
  const { owner_id, name } = req.body;

  createMovieListModel(owner_id, name)
    .then((createdList) => {
      res.status(201).json({
        success: true,
        message: `Movie List ${[0].name} created successfully`,
        createdList,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

module.exports = { registerUser, loginUser, postMovieToList, createMovieList };
