const { cookieOptions } = require('../utils/cookieOptions')
const { createError } = require('../utils/createError')
exports.logout = async (req, res, next) => {
  try {
    res.cookie('jwt', 'null', cookieOptions(true))
    res.status(200).json({
      status: 'Success'
    })
  } catch (err) {
    return next(createError(res, 'something went wrong', 400))
  }
}