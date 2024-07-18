exports.cookieOptions = (logout) => {
  const options = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 1000 * 60 * 60),
    secure: true,
    httpOnly: true,
    sameSite: "Strict",
  };
  if (logout) {
    options.expires = new Date(Date.now());
  }
  return options;
};
