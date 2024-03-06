const express = require("express");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const tempUserModel = require("../models/tempUserModel");

const router = express.Router();

//reject user request
router.put("/reject/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await tempUserModel.findByIdAndDelete(id);
    res.json({
      status: "rejected successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in accept  user request.",
    });
  }
});

//accept user
router.put("/accept/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tempUserModel.findById(id);
    if (data && data.status === false) {
      data.status = true;
      await data.save();
      const newUser = new userModel({
        _id: data._id,
        logname: data.logname,
        logemail: data.logemail,
        logpass: data.logpass,
      });
      let updatedData=await newUser.save();
      await tempUserModel.findByIdAndDelete(id)
      res.json({
        status: "success",
        userData:updatedData
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong in accepting user by admin.",
    });
  }
});

//view all users that are pending
router.get("/viewallreq", async (req, res) => {
  try {
    let data = await tempUserModel.find({ status: false });
    res.json({
      status: "success",
      userData: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in view all requests.",
    });
  }
});

module.exports = router;
