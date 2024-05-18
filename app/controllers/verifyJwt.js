const { createError } = require('../utils/createError')
const jwt = require('jsonwebtoken')
const User = require('../userModel')
exports.verifyJwt = async (req, res, next) => {
  try {
    console.log('REQUEST: '+req)
    const token = req.cookies.pfa_jwt
    console.log('Token: '+token)
    if (!token) {
      createError(res, 'Not logged in', 401)
      return
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      createError(res, 'User no longer exists', 401)
      return
    }
    req.user = user;
    next()
  } catch (err) {
    createError(res, 'Something went wrong', 400)
  }
}