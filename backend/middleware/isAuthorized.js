const jwt = require("jsonwebtoken");
// const User = require("../models/user");
const User = require("../models/User");

const isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `${req.user.role} not allowed to access this resource.` });
      }
      next();
    };
};


module.exports = isAuthorized;