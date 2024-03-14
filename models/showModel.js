const mongoose = require("mongoose");

const showModel = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
});

module.exports = mongoose.model("shows", showModel);
