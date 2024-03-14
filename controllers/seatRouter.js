const express = require("express");
const seatModel = require("../models/seatModel");

const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    let data = req.body;
    let newBooking = new seatModel(data);
    newBooking.isBooked = true;
    let result = await newBooking.save();
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error),
      res.status(500).json({
        status: "error",
        message: "somthing went wrong in movie booking",
      });
  }
});

module.exports = router;
