const { cookieOptions } = require('../utils/cookieOptions')
const { createError } = require('../utils/createError')
exports.logout = async (req, res) => {
  try {
    res.cookie('pfa_jwt', 'null', cookieOptions(true))
    res.status(200).json({
      status: 'Success'
    })
  } catch (err) {
    createError(res, 'something went wrong', 400)
  }
}