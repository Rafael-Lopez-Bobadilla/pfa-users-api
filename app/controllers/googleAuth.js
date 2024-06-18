const User = require("../userModel");
const { cookieOptions } = require("../utils/cookieOptions");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const verify = async (token, client) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "215994121648-uc647b3pmh2jui4pp6te812880pd5rvk.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return payload;
};
exports.googleAuth = async (req, res, next) => {
  try {
    const client = new OAuth2Client();
    const { authorization } = req.headers;
    const tokenID = authorization.split(" ")[1];
    const info = await verify(tokenID, client);
    const { email, name } = info;
    const user = await User.findOne({ email }).select("+password -_id -__v");
    if (user) {
      const id = user._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      user.password = undefined;
      res.cookie("pfa_jwt", token, cookieOptions());
      res.status(200).json({
        status: "success",
        user,
      });
    }
    if (!user) {
      const newUser = await User.create({
        name: name,
        email: email,
      });
      const id = newUser._id;
      token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      newUser.password = undefined;
      res.cookie("pfa_jwt", token, cookieOptions());
      res.status(200).json({
        status: "success",
        user: newUser,
      });
    }
  } catch (err) {
    next(err);
  }
};
