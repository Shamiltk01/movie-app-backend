const mongoose = require("mongoose");

const movieModel = new mongoose.Schema({
  previousMovie: {
    type: String,
    required: true,
  },
  presentMovie: {
    type: String,
    required: true,
  },
  upcomingMovie: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("movies", movieModel);
