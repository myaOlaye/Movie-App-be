const { respondToShareRequestModel } = require("../model/patch-models");

const respondToShareRequest = (req, res, next) => {
  const { response } = req.body;
  const { share_id } = req.params; // will either be accepted or declined

  respondToShareRequestModel(share_id, response)
    .then((updatedShare) => {
      res.status(201).json({
        success: true,
        message: `Movie List ${response}`,
        updatedShare,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    });
};

module.exports = { respondToShareRequest };
