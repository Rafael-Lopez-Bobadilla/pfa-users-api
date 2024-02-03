const { createError } = require('../utils/createError')
const User = require('../userModel')
const { cookieOptions } = require('../utils/cookieOptions')
const jwt = require('jsonwebtoken')
exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body
    if (!name || !password) {

      return next(createError('name or password no included', 400))
    }
    const user = await User.findOne({ name }).select('+password')
    if (!user) {
      return next(createError('Incorrect name or password', 401))
    }
    const correct = await user.correctPassword(password, user.password)
    if (!correct) {
      return next(createError('Incorrect name or password', 401))
    }
    const id = user._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.cookie('jwt', token, cookieOptions())
    res.status(200).json({
      status: "success"
    })
  } catch (err) {
    next(createError(err, 400))
  }
}