const User = require("../userModel");
const { cookieOptions } = require("./utils/cookieOptions");
const { getToken } = require("./utils/getToken");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { pick } = require("lodash");
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
    const user = await User.findOne({ email });
    if (user) {
      const token = getToken(user._id);
      res.cookie("pfa_jwt", token, cookieOptions());
      res.status(200).json(pick(user.toJSON(), ["name", "email", "favorites"]));
    }
    if (!user) {
      const newUser = await User.create({
        name: name,
        email: email,
      });
      const id = newUser._id;
      const token = getToken(newUser._id);
      res.cookie("pfa_jwt", token, cookieOptions());
      res
        .status(200)
        .json(pick(newUser.toJSON(), ["name", "email", "favorites"]));
    }
  } catch (err) {
    next(err);
  }
};
