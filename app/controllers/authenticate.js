const User = require("../userModel");
const { getToken } = require("./utils/getToken");
const { cookieOptions } = require("./utils/cookieOptions");
const { pick } = require("lodash");
exports.authenticate = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID);
    const token = getToken(user._id);
    res.cookie("pfa_jwt", token, cookieOptions());
    res.status(200).json(pick(user.toJSON(), ["name", "email", "favorites"]));
  } catch (err) {
    next(err);
  }
};
