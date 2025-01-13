const db = require("../connection");
const format = require("pg-format");

const seed = (usersData) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      const usersTable = db.query(`
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              username VARCHAR(50) not null,
              email VARCHAR(255) not null,
              password_hash VARCHAR not null,
              profile_img VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
              created_at TIMESTAMP DEFAULT NOW()
            );`);
      return usersTable;
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, email, password_hash, profile_img, created_at) VALUES %L",
        usersData.map(
          ({ username, email, password_hash, profile_img, created_at }) => [
            username,
            email,
            password_hash,
            profile_img,
            created_at,
          ]
        )
      );
      return (insertUsers = db.query(insertUsersQueryStr));
    });
};

module.exports = seed;
