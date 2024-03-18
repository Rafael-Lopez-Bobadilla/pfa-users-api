const { createError } = require('../utils/createError')
const User = require('../userModel')
const { cookieOptions } = require('../utils/cookieOptions')
const jwt = require('jsonwebtoken')
const { getResUser } = require('../utils/getResUser')
const { OAuth2Client } = require('google-auth-library')
const verify = async (token, client) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '215994121648-uc647b3pmh2jui4pp6te812880pd5rvk.apps.googleusercontent.com'
  });
  const payload = ticket.getPayload();
  return payload
}
exports.googleAuth = async (req, res) => {
  try {
    const client = new OAuth2Client();
    const { authorization } = req.headers
    const tokenID = authorization.split(' ')[1]
    const info = await verify(tokenID, client)
    const { email, name } = info
    let resUser
    let token
    const user = await User.findOne({ email }).select('+password')
    if (user) {
      const id = user._id
      token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })
      resUser = getResUser(user)
    }
    if (!user) {
      const newUser = await User.create({
        name: name,
        email: email,
      })
      const id = newUser._id
      token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })
      resUser = getResUser(newUser)
    }
    res.cookie('pfa_jwt', token, cookieOptions())
    res.status(200).json({
      status: "success",
      user: resUser
    })
  } catch (err) {
    createError(res, 'something went wrong', 400)
  }
}