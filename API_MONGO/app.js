const express = require("express");
const mongoose = require("mongoose");

// Conectarnos a base de datos

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("API WORK");
});

mongoose
  .connect("mongodb://localhost/demo")
  .then(() => {
    console.log("conectado a mongo");
  })
  .catch((err) => console.log(`No se pudo conectar por un error ${err}`));
