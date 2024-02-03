exports.authenticate = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      user: req.user
    })
  } catch (err) {
    return next(err, 400)
  }
}