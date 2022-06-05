// Usar mongoose
const mongoose = require("mongoose");

// Conectarnos a mongo
mongoose
  .connect("mongodb://localhost/demo")
  .then(() => {
    console.log("conectado a mongo");
  })
  .catch((err) => console.log(`No se pudo conectar por un error ${err}`));
