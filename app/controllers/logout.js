const { cookieOptions } = require("../utils/cookieOptions");
exports.logout = async (req, res, next) => {
  try {
    res.cookie("pfa_jwt", "null", cookieOptions(true));
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};
