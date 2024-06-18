const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    select: false,
  },
  favorites: [String],
});

//method avialable to every document
userSchema.methods.correctPassword = async function (
  candidate,
  actualPassword
) {
  try {
    const correct = await bcrypt.compare(candidate, actualPassword);
    return correct;
  } catch {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
