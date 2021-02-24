const mongoose = require("mongoose");



const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

getGenres = async () => {
  genres = await Genre.find().sort("-name");
  // console.log(genres);
  return genres;
};

getGenre = async (id) => {
  return await Genre.findById(id);
};

createGenre = async (genre) => {
  const newGenre = new Genre(genre);

  return await newGenre.save();
};

updateGenre = async (id, genre) => {
  return await Genre.findByIdAndUpdate(
    id,
    { $set: { name: genre } },
    { new: true }
  );
};

deleteGenre = async (id) => {
  return await Genre.findByIdAndRemove(id);
};

module.exports.getGenre = getGenre;
module.exports.getGenres = getGenres;
module.exports.createGenre = createGenre;
module.exports.updateGenre = updateGenre;
module.exports.deleteGenre = deleteGenre;
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
