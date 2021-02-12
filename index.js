const mongoose = require("mongoose");
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("DataBase Connected...."))
  .catch((err) => console.error("Error: ", err));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));