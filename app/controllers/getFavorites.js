const User = require('../userModel')
const { createError } = require('../utils/createError')
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    res.status(200).json({
      status: 'Success',
      favorites: user.favorites
    })
  } catch (err) {
    return next(createError(res, 'something went wrong', 400))
  }
}