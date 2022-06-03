// Importar express
const express = require("express");

// Crear instancia de express
const app = express();

// Traer JOI (VALIDADOR)
const Joi = require('joi');
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

// POST 
app.use(express.json()); 

app.post('/api/usuarios', (req,res)=>{
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
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required()})

  
  const {error,value} = schema.validate({ nombre:req.body.nombre});

  if(!error){
    const usuario = {
      id: usuarios.length + 1,
      nombre: value.nombre,
    }; 
 
    usuarios.push(usuario)
    res.send(usuario)
    return
  }

  res.status(400).send(error)
  
})


/*
CONFIGURACIÓN DE PUERTOS
- Puerto. 
- Accion a realizar durante la ejecución.
*/

app.listen(port, () => {
  console.log(`servidor en ejecución en el puerto ${port}`);
});

