exports.getResUser = (user) => {
  const { name, email, favorites } = user
  const resUser = { name, email, favorites }
  return resUser
}