# OurFlicks-be

# Users

POST api/users/register ✅
POST api/users/login ✅

# MovieLists

GET api/movielists/:owner_id ✅
POST api/movielists !!
DELTE api/movielists/:movielist_id/:tmdb_movie_id✅ - deleting movie from a specific movie list
DELETE api/movielists/:movielist_id - deleting a movie list ✅

# MovieListItems

GET api/movielistItems/:movielist_id ✅
POST api/movielistsitems ✅
GET api/movielistsitems/:movielist_id/:tmdb_movie_id
