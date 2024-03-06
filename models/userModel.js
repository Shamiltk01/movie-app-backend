const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  logname: {
    type: String,
    required: true,
  },
  logemail: {
    type: String,
    required: true,
  },
  logpass: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    status: ['pending','accepted','rejected'],
    default: 'pending'
  },
});

module.exports = mongoose.model("users", userModel);
