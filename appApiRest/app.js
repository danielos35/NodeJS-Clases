// Importar express
const express = require("express");

// Crear instancia de express
const app = express();

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

app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express");
});

app.get("/api/usuarios", (req, res) => {
  res.send(["Daniel", "Felipe", "Sebastian", "Jose"]);
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

/*
CONFIGURACIÓN DE PUERTOS
- Puerto. 
- Accion a realizar durante la ejecución.
*/
app.listen(port, () => {
  console.log(`servidor en ejecución en el puerto ${port}`);
});


// DATA
const usuarios = [
  {id:0, nombre:'Daniel1'},
  {id:1, nombre:'Daniel2'},
  {id:2, nombre:'Daniel3'},
  {id:3, nombre:'Daniel4'}
]


// PETICIÓN GET 
app.get('/consulta/:id',(req,res)=>{

  // Los valores siempre vienen de tipo string, por tal deben de ser convertidos
  let usuario = usuarios.find(res=>res.id===  +req.params.id)

  // En caso de no existir el valor
  if(!usuario)res.status(404).send('El usuario no fue encontrado')

  // En caso de que si
  res.send(usuario)
})
