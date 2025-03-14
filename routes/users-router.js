const express = require("express");
const usersRouter = express.Router();

const { getUsers, getUser } = require("../controller/get-controllers");
const {
  registerUser,
  loginUser,
  authotization,
} = require("../controller/post-controllers");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUser);
usersRouter.route("/userData").post(authotization);
usersRouter.route("/register").post(registerUser);
usersRouter.route("/login").post(loginUser);

module.exports = usersRouter;
