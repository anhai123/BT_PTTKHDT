const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/user.model");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role_id === 1) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Moderator Role!"
    });
    return;
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.userId
      });
    }
  }
};

isStaff = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role_id === 2) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Staff Role!"
    });
    return;
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.userId
      });
    }
  }
};

isCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role_id === 3) {
      next();
      return;
    }

    res.status(403).send({
      message: "Require Customer Role!"
    });
    return;
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found User with id ${req.userId}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving User with id " + req.userId
      });
    }
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isModerator: isModerator,
  isStaff: isStaff,
  isCustomer: isCustomer,
};
module.exports = authJwt;
