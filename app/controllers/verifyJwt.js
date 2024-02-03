const { createError } = require('../utils/createError')
const jwt = require('jsonwebtoken')
const User = require('../userModel')
exports.verifyJwt = async (req, res, next) => {
  try {
    const coockieString = req.headers.cookie
    if (!coockieString) {
      return next(createError('Not logged in', 401))
    }
    const coockies = coockieString.split(/=|;/)
    const jwtIndex = coockies.findIndex(str => str === 'jwt')
    const token = coockies[jwtIndex + 1]
    if (!token) {
      return next(createError('Not logged in', 401))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return next(createError('User no longer exists', 401))
    }
    req.user = user;
    next()
  } catch (err) {
    next(createError(err, 401))
  }
}