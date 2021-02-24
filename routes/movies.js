const express = require('express');
const connector = require('../database/movieConnector');
const router = express.Router();
const Joi = require('Joi');

router.get("/", async (req, res) => {
  movies = await connector.getMovies();

  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await connector.createMovie({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const movie = await connector.updateMovie(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  if (!movie)
    return res
      .status(404)
      .send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await connector.deleteMovie(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await connector.getMovie(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send("The movie with the given ID was not found.");
  res.send(movie);
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    genre: Joi.object().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };

  return Joi.validate(movie, schema);
}

module.exports = router;