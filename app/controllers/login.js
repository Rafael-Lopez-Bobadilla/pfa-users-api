const { createError } = require("./utils/createError");
const User = require("../userModel");
const { cookieOptions } = require("./utils/cookieOptions");
const { getToken } = require("./utils/getToken");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = createError("name or password not included", 400);
      throw err;
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const err = createError("email", 401);
      throw err;
    }
    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      const err = createError("password", 401);
      throw err;
    }
    const token = getToken(user._id);
    res.cookie("pfa_jwt", token, cookieOptions());
    res.status(200).json(pick(user.toJSON(), ["name", "email", "favorites"]));
  } catch (err) {
    next(err);
  }
};
