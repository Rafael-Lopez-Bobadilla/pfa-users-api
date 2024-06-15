const { createError } = require("../utils/createError");
const jwt = require("jsonwebtoken");
const User = require("../userModel");
exports.verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies.pfa_jwt;
    console.log("Token: " + token);
    if (!token) {
      const err = createError("Not logged in", 401);
      throw err;
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      const err = createError("User no longer exists", 401);
      throw err;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
