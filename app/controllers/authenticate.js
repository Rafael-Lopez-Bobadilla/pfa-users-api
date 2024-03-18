const { createError } = require('../utils/createError')
const { getResUser } = require('../utils/getResUser')
exports.authenticate = async (req, res) => {
  const resUser = getResUser(req.user)
  try {
    res.status(200).json({
      status: "success",
      user: resUser
    })
  } catch (err) {
    createError(res, 'something went wrong', 400)
  }
}