const { createError } = require("../utils/createError");
const { cookieOptions } = require("../utils/cookieOptions");
const User = require("../userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { pick } = require("lodash");
exports.signup = async (req, res, next) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("pfa_jwt", token, cookieOptions());
    const user = pick(newUser.toJSON(), ["name", "email", "favorites"]);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      const err = createError("An account with this email already exists", 400);
      return next(err);
    }
    next(err);
  }
};
