const { createError } = require('../utils/createError')
const User = require('../userModel')
const { cookieOptions } = require('../utils/cookieOptions')
const jwt = require('jsonwebtoken')
const { getResUser } = require('../utils/getResUser')
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      createError(res, 'name or password no included', 400)
      return
    }
    let user = await User.findOne({ email }).select('+password')
    if (!user) {
      createError(res, 'Incorrect email or password', 401)
      return
    }
    const correct = await user.correctPassword(password, user.password)
    if (!correct) {
      createError(res, 'Incorrect email or password', 401)
      return
    }
    const id = user._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    const resUser = getResUser(user)
    res.cookie('pfa_jwt', token, cookieOptions())
    res.status(200).json({
      status: "success",
      user: resUser
    })
  } catch (err) {
    createError(res, 'something went wrong', 400)
  }
}