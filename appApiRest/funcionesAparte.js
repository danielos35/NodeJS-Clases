let funcionExterna = function (req, res, next) {
  console.log("Ejecución de una función externa.....");
  next();
};

// Exportar función.
module.exports = funcionExterna;
