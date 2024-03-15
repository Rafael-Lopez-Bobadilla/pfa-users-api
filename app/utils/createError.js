exports.createError = (res, message, code) => {
  res.status(code).json({
    status: "fail",
    data: {
      error: message
    }
  })
}