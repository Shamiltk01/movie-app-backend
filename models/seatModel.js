const mongoose = require("mongoose");

const seatModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },

  isBooked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("seats", seatModel);
