const express = require("express");
const seatModel = require("../models/seatModel");

const router = express.Router();

// API endpoint to book seats
router.post("/book", (req, res) => {
  const { selectedSeats, showDate, showTime } = req.body;
  const alreadyBooked = selectedSeats.some((seat) =>
    bookedSeats.includes(seat)
  );
  if (alreadyBooked) {
    return res.status(400).json({
      status: "One or more selected seats are already booked.",
    });
  }
  bookedSeats = bookedSeats.concat(selectedSeats);
  console.log("Seats booked:", selectedSeats);
  console.log("Date:", showDate);
  console.log("Time:", showTime);
  res.status(200).json({ status: "Seats booked successfully." });
});

// router.post("/book", async (req, res) => {
//   try {
//     let data = req.body;
//     console.log(data)
//     let newBooking = new seatModel(data);
//     newBooking.isBooked = true;
//     let result = await newBooking.save();
//     res.json({
//       status: "success",
//     });
//   } catch (error) {
//     console.error(error),
//       res.status(500).json({
//         status: "error",
//         message: "somthing went wrong in movie booking",
//       });
//   }
// });

module.exports = router;
