const User = require("../userModel");
exports.authenticate = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID).select(
      "name email favorites -_id"
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
