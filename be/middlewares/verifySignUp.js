const User = require("../models/user.model");

checkDuplicateUsername = async (req, res, next) => {
  // Username
  try {
    await User.findByUserName(req.body.user_name);
    res.status(400).send({
      message: "Failed! Username is already in use!",
    });
    return;
  } catch (err) {
    if (err.kind === "not_found") {
      next();
    } else {
      res.status(500).send({
        message: "Error retrieving User with username " + req.body.user_name
      });
    }
  }
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
