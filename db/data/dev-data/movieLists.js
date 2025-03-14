module.exports = [
  {
    movieList_id: 1,
    owner_id: 1,
    name: "John’s Favorite Movies",
    created_at: "2025-01-01 08:00:00",
    updated_at: "2025-01-01 08:00:00",
  },
  {
    movieList_id: 2,
    owner_id: 2,
    name: "Jane’s Action Picks",
    created_at: "2025-01-02 14:30:00",
    updated_at: "2025-01-02 14:30:00",
  },
  // this is a list that sanderson has not shared, but he has shared list 1 with two other users
  // so in the GET api/movielists/:owner_id we should exclude list 1
  {
    movieList_id: 3,
    owner_id: 1,
    name: "Top 10 of 2024",
    created_at: "2025-01-03 12:00:00",
    updated_at: "2025-01-03 12:00:00",
  },
  {
    movieList_id: 4,
    owner_id: 3,
    name: "Family Movie Night",
    created_at: "2025-01-04 18:00:00",
    updated_at: "2025-01-04 18:00:00",
  },
  {
    movieList_id: 5,
    owner_id: 4,
    name: "Romantic Comedies",
    created_at: "2025-01-05 09:15:00",
    updated_at: "2025-01-05 09:15:00",
  },
  {
    movieList_id: 6,
    owner_id: 5,
    name: "Horror Movie Marathon",
    created_at: "2025-01-06 20:45:00",
    updated_at: "2025-01-06 20:45:00",
  },
  {
    movieList_id: 7,
    owner_id: 6,
    name: "Sci-Fi Classics",
    created_at: "2025-01-07 11:30:00",
    updated_at: "2025-01-07 11:30:00",
  },
  {
    movieList_id: 8,
    owner_id: 2,
    name: "Animated Movies for Kids",
    created_at: "2025-01-08 16:00:00",
    updated_at: "2025-01-08 16:00:00",
  },
  {
    movieList_id: 9,
    owner_id: 3,
    name: "Award-Winning Films",
    created_at: "2025-01-09 17:00:00",
    updated_at: "2025-01-09 17:00:00",
  },
  {
    movieList_id: 10,
    owner_id: 4,
    name: "Mind-Bending Thrillers",
    created_at: "2025-01-10 13:00:00",
    updated_at: "2025-01-10 13:00:00",
  },
];
