const User = require('../userModel')
const { createError } = require('../utils/createError')

exports.updateFavorites = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { "$addToSet": { favorites: req.body.favorites } }, {
      new: true,
      upsert: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'Success',
      user: updatedUser
    })
  } catch (err) {
    return next(createError(err, 400))
  }
}