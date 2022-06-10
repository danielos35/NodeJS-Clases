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

let consultarCursos = async function () {
  // Operadores de comparación:

  // eq  (igual)
  // ne  (no igual)
  // gt  (mayor que)
  // gte (mayor o igual que)
  // lt  (menor que)
  // lte (menor o igual que)
  // in  (valores dentro de un consulta)
  // nin (not in, valores que no está en una consulta)
  // or (uno o lo tro)
  // and (uno y el otro)

  //PAGINAR RESULTADOS (mostrar una pequeña cantidad de datos de la consulta ).......
  const numeroPaginas = 2;
  const sizePage = 10;

  const cursos = await Curso.skip((numeroPaginas - 1) * sizePage)
    .limit(sizePage)
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

    // or (se cumple una de las dos opciones)
    .find()
    .or({ autor: "Daniel" }, { publicado: true })

    // and
    .find()
    .and({ autor: "Daniel" }, { publicado: true })

    // EXPRESIONES REGULARES......................................................

    // Iniciar con las letras dan
    .find({ autor: /^dan/ })

    // termina con las letras dan
    .find({ autor: /dan$/ })

    // Cuando un campo tiene un contenido expesifico
    .find({ autor: /.*ro.*./ })

    // Numero de respuestas requeridas
    .limit(2)

    // Ordenar por el autor (ascendete 1, descendente -1)
    .sort({ autor: -1 })

    // Definir elementos a mostrar
    .select({ nombre: 1, etiquetas: 1 });

  console.log("consultas: " + cursos);
};

// consultarCursos()

// ACTUALIZAR DATOS DEL DOCUMENTO
const actualizarDocumento = async function (id) {
  // FORMA 1
  //   const curso = await Curso.findById(id);
  //   if (!curso) {
  //     console.log("El curso no existe");
  //   }

  //   // Opción Uno
  //   curso.publicado = false;
  //   curso.autor = "Felipe Alexandro";

  //   // Opción Dos
  //   // curso.set({
  //   //   publicado: true,
  //   //   autor: "Pepito Lopez",
  //   // });

  //   const resultado = await curso.save();
  //   console.log(resultado);
  //

  // FORMA 2
  const resultado = await Curso.update(
    { _id: id },
    {
      $set: {
        autor: "Maria",
        publicado: false,
      },
    }
  );

  console.log(resultado);

  // Retorna el documento antes y lo actualza
  const resultadoDos = await Curso.findByIdAndUpdate(id, {
    $set: {
      autor: "Luis",
      publicado: false,
    },
  });

  // Retorna el documento ya actualizado
  const resultadoTres = await Curso.findByIdAndUpdate(
    id,
    {
      $set: {
        autor: "Luis",
        publicado: false,
      },
    },
    { new: true }
  );
};

actualizarDocumento("629d213b3a2db361e5c434fe");

// Eliminar Doicumento
// los datos no se suelen eliminar, sino cambiar el estado de estos mismos
const eliminarDocumento = function(){
  const result = await Curso.deleteOne({_id:id})
  console.log(result);
}