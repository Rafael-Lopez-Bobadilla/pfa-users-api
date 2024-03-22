exports.cookieOptions = (logout) => {
  const options = {
    expires: new Date(Date.now() +
      process.env.COOKIE_EXPIRES
      * 1000 /*milisegundos a segundos*/
      * 60 /*segundos a minutos*/
      * 60 /*minutos a horas*/),
    secure: true, //only sent over https
    httpOnly: true, //this way it cant be manipulated by javascript on the client
    sameSite: 'None'
  }
  if (logout) {
    options.expires = new Date(Date.now())
  }
  return options
}