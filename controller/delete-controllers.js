const {
  deleteMovieModel,
  deleteMovieListModel,
} = require("../model/delete-models");

const deleteMovie = (req, res, next) => {
  const { tmdb_movie_id, movielist_id } = req.params;
  deleteMovieModel(tmdb_movie_id, movielist_id)
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

const deleteMovieList = (req, res, next) => {
  const { movielist_id } = req.params;

  deleteMovieListModel(movielist_id)
    .then((movieList) => {
      res.status(200).json({
        success: true,
        message: "Movie List deleted successfully",
        movieList,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

module.exports = {
  deleteMovie,
  deleteMovieList,
};
