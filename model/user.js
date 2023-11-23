const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: Number,
  service: String,
  city: String,
  mobile: { type: Number, required: true },
  image: String,
  address: String,
  password: { type: String, required: true },
  state: String,
});

module.exports = mongoose.model("User", userSchema);
