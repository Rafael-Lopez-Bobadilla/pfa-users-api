const User = require("../userModel");
const createError = require("../utils/createError");
exports.updateFavorites = async (req, res, next) => {
  const { action } = req.params;
  try {
    let update;
    if (action === "add") {
      update = { $push: { favorites: req.body.favorite } };
    } else if (action === "remove") {
      update = { $pull: { favorites: req.body.favorite } };
    } else {
      createError("Invalid action", 400);
    }
    const updatedUser = await User.findByIdAndUpdate(req.userID, update, {
      new: true,
      runValidators: true,
    }).select("name email favorites -_id");
    res.status(200).json({
      status: "Success",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
