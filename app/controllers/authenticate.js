const User = require("../userModel");
exports.authenticate = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID).select(
      "name email favorites -_id"
    );
    console.log(user);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next(err);
  }
};
