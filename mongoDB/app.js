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


// GUARDADO DE INFORMACIÓN...................................................

// Creación de la clase. (GUARDADO)

const Curso = mongoose.model("Curso", cursoSchema);
let crearCurso = async function () {
  const curso = new Curso({
    nombre: "Node",
    autor: "Pepito Perez",
    etiquetas: ["Desarrollo", "IA"],
    publicado: true,
  });

  // Guardado de documentos
  const respuesta = await curso.save();
  console.log(respuesta);
};

crearCurso();


// CONSULTA DE INFORMACIÓN

let consultarCursos = async function(){
  // Operadores de comparación:

  // eq  (igual)
  // ne  (no igual)
  // gt  (mayor que)
  // gte (mayor o igual que)
  // lt  (menor que)
  // lte (menor o igual que)
  // in  (valores dentro de un consulta)
  // nin (not in, valores que no está en una consulta)

  const cursos = await Curso
    // eq
    .find({ precio: 10 })

    // rango de precios gte y lte
    .find({ precio: { $gte: 10, $lte: 30 } })

    //Valores especificos
    .find({ precio: { $in: [12, 15, 17] } })

    // El metodo find nos permite consultar información
    .find(
      // Condicionar respuesta
      { publicado: true }
    )

    // Numero de respuestas requeridas
    .limit(2)

    // Ordenar por el autor (ascendete 1, descendente -1)
    .sort({ autor: -1 })

    // Definir elementos a mostrar
    .select({ nombre: 1, etiquetas: 1 });

  console.log("consultas: " + cursos);
}

consultarCursos()