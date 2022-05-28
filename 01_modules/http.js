const http = require("http");

// Crear servidor.
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hola Mundo");
    res.end();
  }

  if (req.url === "/test") {
    res.write("Este es un test");
    res.end();
  }
});

// Evento
server.on("conexion", (puerto) => {
  console.log("conectado");
});

// Escuchar por medio de un puerto.
server.listen(3000);
console.log("servidor escuchando en el puerto 3000");
