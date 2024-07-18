const jwt = require("jsonwebtoken");
exports.getToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * process.env.JWT_EXPIRES_IN, // seconds
  });
  return token;
};
