const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  pic: {
    type: String,
    default:
      "https://tse1.mm.bing.net/th?id=OIP.zsaaVp0tIiSnOK-1rYpBnwAAAA&pid=Api&P=0&w=181&h=181",
  },
  user: { type: String },
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
});
const User = mongoose.model("Auth", userSchema);

module.exports = User;
