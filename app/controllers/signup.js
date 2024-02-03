const { createError } = require('../utils/createError')
const { cookieOptions } = require('../utils/cookieOptions')
const User = require('../userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
exports.signup = async (req, res, next) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12)
    const newUser = await User.create({
      name: req.body.name,
      password: encryptedPassword,
    })
    const id = newUser._id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.cookie('jwt', token, cookieOptions())
    newUser.password = undefined
    res.status(201).json({
      status: "success",
      data: {
        user: newUser
      }
    })
  } catch (err) {
    next(createError(err, 400))
  }
}