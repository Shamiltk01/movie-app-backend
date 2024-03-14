const express = require("express");
const showModel = require("../models/showModel");
const router = express.Router();

//add shows
router.post("/add", async (req, res) => {
  try {
    const input = req.body;
    let newShow = new showModel(input);
    await newShow.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in add shows.",
    });
  }
});

//view all shows
router.get("/viewall", async (req, res) => {
  try {
    let data = await showModel
      .find()
      .populate("movie", "-_id -__v")
      .exec();
    res.json({
      status: "success",
      shows: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in view all shows.",
    });
  }
});

module.exports = router;
