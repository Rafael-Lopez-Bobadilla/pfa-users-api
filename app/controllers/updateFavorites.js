const User = require('../userModel')
const { createError } = require('../utils/createError')

exports.updateFavorites = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { favorites: req.body.favorites }, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'Success',
      user: updatedUser
    })
  } catch (err) {
    createError(res, 'Something went wrong', 400)
  }
}