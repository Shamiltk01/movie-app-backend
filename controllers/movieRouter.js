const express = require("express");
const movieModel = require("../models/movieModel");

const router = express.Router();

//add movie
router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    let existingMovie = await movieModel.findOne();
    if (!existingMovie) {
      existingMovie = new movieModel({
        previousMovie: " ",
        presentMovie: " ",
        upcomingMovie: data.upcomingMovie,
      });
      await existingMovie.save();
      res.json({
        status: "added new movie",
      });
    } else {
      existingMovie.previousMovie = existingMovie.presentMovie;
      existingMovie.presentMovie = existingMovie.upcomingMovie;
      existingMovie.upcomingMovie = data.upcomingMovie;
      await existingMovie.save();
      res.json({
        status: "movie updated",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in add movie.",
    });
  }
});

//delete movie
// router.post("/delete", async (req, res) => {
//   try {
//     const movieName = req.body;

//     if (!movieName) {
//       return res.status(400).json({
//         status: "error",
//         message: "Movie name is required",
//       });
//     }
//     let data = await movieModel.findOne(movieName);
//     data.upcomingMovie = "null";
//     if (!data) {
//       return res.status(404).json({
//         status: "error",
//         message: "Movie not found",
//       });
//     }
//     res.json({
//       status: "success",
//       message: "Successfully deleted",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "error",
//       message: "Something went wrong in delete movie",
//     });
//   }
// });


//view all movies
router.get("/viewall", async (req, res) => {
  try {
    let data = await movieModel.find();
    res.json({
      status: "success",
      movies: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong in view all movies.",
    });
  }
});

//deletMovie
router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await movieModel.findByIdAndDelete(id);
    res.json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "somthing went wrong on delete movie",
    });
  }
});

module.exports = router;
