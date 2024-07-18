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
    const expDate = decoded.exp * 1000; //decoded.exp = seconds since epoch
    const currentDate = Date.now(); // milliseconds since epoch
    const minutesLeft = new Date(expDate - currentDate) / (1000 * 60);
    if (minutesLeft < 15) {
      const newToken = getToken(decoded.id);
      res.cookie("pfa_jwt", newToken, cookieOptions());
    }
    req.userID = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
