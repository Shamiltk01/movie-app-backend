const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const tempUserModel = require("../models/tempUserModel");

const router = express.Router();

//hashfunction
const hashFunction = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pass, salt);
};

//user signup
router.post("/signup", async (req, res) => {
  try {
    let inputPass = req.body.logpass;
    let inputEmail = req.body.logemail;
    let inputName = req.body.logname;
    if (!inputPass || !inputEmail || !inputName) {
      return res.json({
        status: "required all fields.",
      });
    }
    let input = req.body;
    let data = await userModel.findOne({ logemail: inputEmail });
    if (!data) {
      let tempUser = await tempUserModel.findOne({ logemail: inputEmail });
      if (!tempUser) {
        let hashedPass = await hashFunction(inputPass);
        input.logpass = hashedPass;
        let newUser = new tempUserModel(input);
        await newUser.save();
        return res.json({
          status: "successfully send request",
        });
      } else {
        return res.json({
          status: "request is pending",
        });
      }
    } else {
      return res.json({
        status: "user already exists",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "something went wrong in user signup.",
    });
  }
});

//admin with user signin
router.post("/signin", async (req, res) => {
  try {
    const inputPass = req.body.logpass;
    const inputEmail = req.body.logemail;
    if (!inputPass || !inputEmail) {
      res.json({
        status: "required all fields",
      });
    }

    let tempData = await tempUserModel.findOne({ logemail: inputEmail });
    if (tempData) {
      return res.json({
        status: "request is pending",
      });
    }

    let data = await userModel.findOne({ logemail: inputEmail });
    if (!data) {
      let admindata = await adminModel.findOne({ logemail: inputEmail });
      if (!admindata) {
        return res.json({
          status: "no user found",
        });
      }
      const dbPasswordAdmin = admindata.logpass;
      if (inputPass !== dbPasswordAdmin) {
        return res.json({
          status: "incorrect password",
        });
      } else {
        const adminSendData = {
          _id: admindata._id,
          logname: admindata.logname,
        };
        return res.json({
          status: "admin success",
          adminData: adminSendData,
        });
      }
    }

    const dbPassword = data.logpass;
    const match = await bcrypt.compare(inputPass, dbPassword);
    if (!match) {
      return res.json({
        status: "incorrect password",
      });
    }

    return res.json({
      status: "user success",
      userData: data,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      message: "something went wrong in signin.",
    });
  }
});

module.exports = router;
