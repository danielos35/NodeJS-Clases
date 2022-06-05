// Usar mongoose.
const mongoose = require("mongoose");

// Conectarnos a mongo.
mongoose
  .connect("mongodb://localhost/demo")
  .then(() => {
    console.log("conectado a mongo");
  })
  .catch((err) => console.log(`No se pudo conectar por un error ${err}`));

// Creación del esquema con mogoose.
const cursoSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  etiquetas: [String],
  fecha: { type: Date, default: Date.now },
  publicado: Boolean,
});

// Creación de la clase.
const Curso = mongoose.model("curso", cursoSchema);
const curso = new Curso({
  nombre: "JavaScript",
  autor: "Daniel",
  etiquetas: ["Desarrollo web", "forntEnd"],
  publicado: true,
});
