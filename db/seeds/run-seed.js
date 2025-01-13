const usersData = require("../data/dev-data/users");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(usersData).then(() => db.end());
};

runSeed();
