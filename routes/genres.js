const express = require("express");
const router = express.Router();
const database = require("../assets/genreConnector");
const Joi = require("joi");


router.get("/", async (req, res) => {
  genres = await database.getGenres();
  // console.log(database.getGenres());
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await database.createGenre({ name: req.body.name });
  res.send(result);
});

router.put("/:id", async (req, res) => {

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = await database.updateGenre(req.params.id, req.body.name);

  if (!genre) return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await database.deleteGenre(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await database.getGenre(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
