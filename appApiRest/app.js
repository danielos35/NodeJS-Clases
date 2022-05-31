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
