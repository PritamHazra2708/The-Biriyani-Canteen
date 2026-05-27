const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  role: String,

  otp: String,

  expiresAt: Date,

});

module.exports = mongoose.model("Otp", otpSchema);