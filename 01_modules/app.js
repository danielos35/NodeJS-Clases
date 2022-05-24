// Conocer propiedades del moduleß

// Crear datos con const para evitar la modificación a futuro

const verDatos = function (mensaje) {
  console.log(mensaje);
};

const verDatosDos = function (mensaje) {
  console.log(mensaje);
};

// Exportar datos

// despues del punto puedo usar el mismo nombre o utilizarlo como un objeto
// module.exports.showData = verDatos;
module.exports = verDatosDos;

// tambien podemos exportar sin asignar alias:
console.log(module);
