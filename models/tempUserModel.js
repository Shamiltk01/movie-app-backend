const mongoose = require("mongoose");

const tempUserModel = new mongoose.Schema({
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
    status: Boolean,default: false
    
  },
});

module.exports=mongoose.model("tempusers",tempUserModel)