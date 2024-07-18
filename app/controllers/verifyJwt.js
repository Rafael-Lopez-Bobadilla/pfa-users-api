const { createError } = require("./utils/createError");
const jwt = require("jsonwebtoken");
const { getToken } = require("./utils/getToken");
const { cookieOptions } = require("./utils/cookieOptions");
exports.verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies.pfa_jwt;
    if (!token) {
      throw createError("Not logged in", 401);
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
