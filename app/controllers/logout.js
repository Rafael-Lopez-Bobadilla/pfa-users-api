const { cookieOptions } = require("../utils/cookieOptions");
exports.logout = async (req, res, next) => {
  try {
    res.cookie("pfa_jwt", "null", cookieOptions(true));
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
