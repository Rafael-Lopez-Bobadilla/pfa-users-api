exports.createError = (res, message, code) => {
  res.status(code).json({
    status: "fail",
    error: message
  })
}