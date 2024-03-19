const User = require('../userModel')
const { createError } = require('../utils/createError')
const { getResUser } = require('../utils/getResUser')
exports.updateFavorites = async (req, res) => {
  const user = req.user
  let { favorites } = user
  if (favorites.includes(req.body.favorite)) {
    favorites.splice(favorites.indexOf(req.body.favorite), 1)
  } else {
    favorites.push(req.body.favorite)
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { favorites: favorites }, {
      new: true,
      runValidators: true
    })
    const resUser = getResUser(updatedUser)
    res.status(200).json({
      status: 'Success',
      user: resUser
    })
  } catch (err) {
    createError(res, 'Something went wrong', 400)
  }
}