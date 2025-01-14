const express = require("express");
const app = express();
const {
  getApi,
  getUsers,
  getMovieLists,
  registerUser,
  loginUser,
  deleteMovie,
  getMovieListsbyUserId,
  getMovieListItems,
} = require("./controller/controller");

//middleware
app.use(express.json());

// all endpoints
app.get("/api", getApi);
app.get("/api/users", getUsers); // development purpose only
app.post("/api/users/register", registerUser);
app.post("/api/users/login", loginUser);
app.get("/api/movielists", getMovieLists);
app.delete("/api/movielists/:id", deleteMovie);
app.get("/api/movielists/:owner_id", getMovieListsbyUserId);
app.get("/api/:movielist_id/movielistItems", getMovieListItems);

module.exports = app;
