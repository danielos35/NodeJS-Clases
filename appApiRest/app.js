// CONFIGURACIÓN DE ENTORNO
const config = require("config");
console.log("Aplicacion: " + config.get("nombre"));
console.log("Base de datos: " + config.get("configDB.host"));

// Importar express
const express = require("express");

// Crear instancia de express
const app = express();

// Traer JOI (VALIDADOR)
const Joi = require("joi");

// Importar funciones externas
const externo = require("./funcionesAparte");
app.use(externo);

// Recibir en formato JSON
app.use(express.json());

// Recibir datos en variables separadas
app.use(express.urlencoded({ extended: true }));

/*
METODOS.
- app.get();     //Pedir datos
- app.post();    //Enviar de datos
- app.put();     //Actualización
- app.delete();  //Eliminar Datos

ARGUMENTOS
 - Ruta para hacer la consulta.
 - (request, response)=>{}
*/

/*MIDDELWARE
- Función personalizada, que tiene tres tipos de parametros
- req (solicitud).
- res (respuesta).
- next (Para que continue la ejecución del middelware)
*/
// app.use((req,res,next)=>{
//   console.log('logging..');
//   next()
// })

// app.use((req,res,next)=>{
//   console.log('autenticando...');
//   next()
// })

/*RECURSOS ESTATICOS
- Como argumento del express.static('carpeta'), pasamos la carpeta con los recursos estaticos.
*/

app.use(express.static("public"));

// IMPORTAR MORGAN (Middleware de tercero)

if (app.get("env") === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
  console.log("Morgan habilitado...");
}

// DATA
const usuarios = [
  { id: 0, nombre: "Daniel1" },
  { id: 1, nombre: "Daniel2" },
  { id: 2, nombre: "Daniel3" },
  { id: 3, nombre: "Daniel4" },
];

app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express");
});

app.get("/api/usuarios", (req, res) => {
  res.send(usuarios);
});

/*
CREAR PARAMETROS
- Para que sea considerado un parametro debemos de utilizar los : (dos puntos dentro de la aplicación)
*/

app.get("/test/:id/:name", (req, res) => {
  res.send(req.params);
});

/*
QUERY PARAMS
- Estos parametros son consultados mediante ?nombre=daniel en la url
*/
app.get("/query", (req, res) => {
  res.send(req.query);
});

// VARIABLES DE ENTORNO
const port = process.env.PORT || 3000;

// PETICIÓN GET.....................................
app.get("/consulta/:id", (req, res) => {
  // Los valores siempre vienen de tipo string, por tal deben de ser convertidos
  let usuario = usuarios.find((res) => res.id === +req.params.id);

  // En caso de no existir el valor
  if (!usuario) res.status(404).send("El usuario no fue encontrado");

  // En caso de que si
  res.send(usuarios);
});

// POST ...................................................................

app.post("/api/usuarios", (req, res) => {
  // // VAlidación simple
  // if(!req.body.nombre){
  //   // codigo 400 significa que no es un requerimiento valido.
  //   res.status(400).send('Debe ingresar Datos validos')
  //   return
  // }

  /*
    VALIDACIÓN CON JOI
    -Primero definimos las reglas de usuario.
    -Despues Hacemos la validación.
  */

  // URLENCODE.....................................................
  let body = req.body;
  console.log(body.nombre);
  res.json({
    body,
  });

  // JSON...........................................................

  // const schema = Joi.object({
  //   nombre: Joi.string().min(3).max(30).required()})

  // const {error,value} = schema.validate({ nombre:req.body.nombre});

  // if(!error){
  //   const usuario = {
  //     id: usuarios.length + 1,
  //     nombre: value.nombre,
  //   };

  //   usuarios.push(usuario)
  //   res.send(usuario)
  //   return
  // }

  // res.status(400).send(error)
});

// PUT.................................................................

app.put("/api/usuarios/:id", (req, res) => {
  let usuario = usuarios.find((res) => res.id === +req.params.id);
  if (!usuario) res.status(404).send("El usuario no fue encontrado");

  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
  });

  const { error, value } = schema.validate({ nombre: req.body.nombre });

  if (error) {
    res.status(400).send(error);
    return;
  }

  usuario.nombre = value.nombre;
  res.send(usuario);
});

// DELETE........................................
app.delete("/api/usuarios/:id", (req, res) => {
  let usuario = usuarios.find((res) => res.id === +req.params.id);
  if (!usuario) res.status(404).send("El usuario no fue encontrado");

  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
  });

  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);
  res.send(usuarios);
});

/*
CONFIGURACIÓN DE PUERTOS
- Puerto. 
- Accion a realizar durante la ejecución.
*/

app.listen(port, () => {
  console.log(`servidor en ejecución en el puerto ${port}`);
});
