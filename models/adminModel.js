const mongoose = require("mongoose");

const adminModel = new mongoose.Schema({
  logname: {
    type: String,
    required: true,
  },
  logemail:{
    type:String,
    required:true
  },
  logpass: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admins", adminModel);
