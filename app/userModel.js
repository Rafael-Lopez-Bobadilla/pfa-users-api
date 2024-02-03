const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: [10, 'name max lenght: 10 characters'],
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    select: false
  },
  favorites: [String]
})

//method avialable to every document
userSchema.methods.correctPassword = async function (candidate, actualPassword) {
  return await bcrypt.compare(candidate, actualPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User