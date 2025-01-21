# OurFlicks-be

# Users

POST api/users/register ✅
POST api/users/login ✅

# MovieLists

GET api/movielists/:owner_id ❗ NEEDS TO BE UPDATED - to take rows with specific movielist IDs that should NOT be returned ✅
POST api/movielists ✅
DELTE api/movielists/:movielist_id/:tmdb_movie_id✅ - deleting movie from a specific movie list
DELETE api/movielists/:movielist_id - deleting a movie list ✅

# MovieListItems

GET api/movielistItems/:movielist_id ✅
POST api/movielistsitems ✅
GET api/movielistsitems/:movielist_id/:tmdb_movie_id✅

# MovieListShares

GET /api/movieListShares/:username - Retrieve all movie lists shared with or by a specific user ✅
// if a user owns a movie list
// and shares that movie list, the list id will exist in both movielistshares and movielists
// so in the frontend I should first make the request to the movielistshares and GET those lists using the movielist id
// then I can make the GET request to the movielists table with the owner ID where the movielist ID DOES NOT EQUAL any of the movielists already rendered (ids should be saved in state) to avoid duplicate lists
// So i need to update movieLists endpoint❗

POST /api/movieListShares - Allow a user to share a movie list with another user ✅
PATCH /api/movieListShares/:share_id - Allow a user to accept or decline a movie list share

COME TO IF HAVE TIME:
DELETE /api/movieListShares/:movielist_id - Allow a user to remove a shared movie list
GET /api/movieListShares/:share_id - Retrieve a single share's details
GET /api/movieListShares/:movielist_id - Retrieve all the shares for a specific movie list.
