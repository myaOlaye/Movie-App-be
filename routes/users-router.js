const express = require("express");
const usersRouter = express.Router();

const { getUsers } = require("../controller/get-controllers");
const { registerUser, loginUser } = require("../controller/post-controllers");

usersRouter.route("/").get(getUsers);
usersRouter.route("/register").post(registerUser);
usersRouter.route("/login").post(loginUser);

module.exports = usersRouter;
