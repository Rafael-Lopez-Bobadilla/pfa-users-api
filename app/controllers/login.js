const { createError } = require("../utils/createError");
const User = require("../userModel");
const { cookieOptions } = require("../utils/cookieOptions");
const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = createError("name or password no included", 400);
      throw err;
    }
    let user = await User.findOne({ email }).select("+password -_id");
    if (!user) {
      const err = createError("Incorrect email or password", 401);
      throw err;
    }
    const correct = await user.correctPassword(password, user.password);
    if (!correct) {
      const err = createError("Incorrect email or password", 401);
      throw err;
    }
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const authenticatedUser = { ...user };
    delete authenticatedUser.password;
    res.cookie("pfa_jwt", token, cookieOptions());
    res.status(200).json({
      status: "success",
      user: authenticatedUser,
    });
  } catch (err) {
    next(err);
  }
};
