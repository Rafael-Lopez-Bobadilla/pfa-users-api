const { createError } = require('../utils/createError')
exports.authenticate = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      user: req.user
    })
  } catch (err) {
    return next(createError(res, 'something went wrong', 400))
  }
}