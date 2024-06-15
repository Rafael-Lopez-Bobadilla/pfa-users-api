const { getResUser } = require("../utils/getResUser");
exports.authenticate = async (req, res, next) => {
  const resUser = getResUser(req.user);
  try {
    res.status(200).json({
      status: "success",
      user: resUser,
    });
  } catch (err) {
    next(err);
  }
};
