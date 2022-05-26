const archivos = require("fs");
console.log(archivos);

// Leer archivos de la carpeta actual de manera sincrona
console.log(archivos.readdirSync("./"));

// Leer archivos de manera asincrona
archivos.readdir("./", function (err, files) {
  console.log(err);
  console.log(files);
});
