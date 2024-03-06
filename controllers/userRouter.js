const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const router = express.Router();

const hashFunction = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

router.post("/signup", async (req, res) => {
  try {
    let inputPassword = req.body.logpass;
    let user = req.body.logemail;
    let username = req.body.logname;
    let input = req.body;
    let data = await userModel.findOne({ logemail: user });

    if (data) {
      return res.json({
        status: "user already exists",
      });
    }
    let hashedPass = await hashFunction(inputPassword);

    input.logpass = hashedPass;
    let newUser = new userModel(input);

    await newUser.save();

    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "something went wrong in user signup.",
    });
  }
});


//admin with user signin
router.post("/signin", async (req, res) => {
  try {
    let inputPass = req.body.logpass;
    let inputEmail = req.body.logemail;
    let data = await userModel.findOne({ logemail: inputEmail });
    if (!data) {
      let admindata = await adminModel.findOne({ logemail: inputEmail });
      if (!admindata) {
        return res.json({
          status: "no user found",
        });
      }
      let dbPasswordAdmin = admindata.logpass;
      if (inputPass !== dbPasswordAdmin) {
        return res.json({
          status: "incorrect password",
        });
      } else {
        return res.json({
          status: "admin success"
        });
      }
    }
    let dbPassword = data.logpass;
    let match = await bcrypt.compare(inputPass, dbPassword);
    if (!match) {
      return res.json({
        status: "incorrect password",
      });
    }
    res.json({
      status: "user success",
      userData: data,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "somthing went wrong in signin.",
    });
  }
});

module.exports = router;
