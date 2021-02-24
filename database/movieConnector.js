const mongoose = require("mongoose");
const { genreSchema, Genre } = require("./genreConnector");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

getMovies = async () => {
  movies = await Movie.find().sort("-name");
  // console.log(Movies);
  return movies;
};

getMovie = async (id) => {
  return await Movie.findById(id);
};

createMovie = async (movie) => {
  const newMovie = new Movie({
    title: movie.title,
    genre: new Genre ({name: movie.genre.name}),
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  return await newMovie.save();
};

updateMovie = async (id, movie) => {
  return await Movie.findByIdAndUpdate(
    id,
    {
      $set: {
        title: movie.title,
        genre: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      },
    },
    { new: true }
  );
};

deleteMovie = async (id) => {
  return await Movie.findByIdAndRemove(id);
};

module.exports.getMovie = getMovie;
module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
