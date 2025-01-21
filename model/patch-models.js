const db = require("../db/connection");

const respondToShareRequestModel = (share_id, response) => {
  return db
    .query(
      `UPDATE movieListShares
    SET status = $1 WHERE share_id = $2 RETURNING *;`,
      [response, share_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { respondToShareRequestModel };
