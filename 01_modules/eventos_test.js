const EventEmitter = require("events");

// instanciamos un objeto
const emisorDeEventos = new EventEmitter();

// Escuchar
emisorDeEventos.on("mensaje", function (arg) {
  console.log(arg);
});

// Emitir
emisorDeEventos.emit("Hola Mundo!", {
  nombre: "Daniel",
});
