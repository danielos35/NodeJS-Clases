const express = require("express");
const Usuario = require("../models/usuario_model");
const Joi = require("joi");

const schema = Joi.object({
  nombre: Joi.string().min(3).max(10).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const ruta = express.Router();
ruta.get("/", (req, res) => {
  let resultado = verUsuarios();
  resultado
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      res.status(400).json({
        err: err,
      });
    });
});

ruta.post("/", (req, res) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, user) => {
    if (err) {
      res.status(400).json({ error: "Server Error" });
    }

    if (user) {
      return res.status(400).json({ mensaje: "El usuario ya existe." });
    }
  });
  const { error, value } = schema.validate({
    nombre: body.nombre,
    email: body.email,
  });
  if (!error) {
    let resultado = crearUsuario(body);

    resultado
      .then((valor) => {
        res.json({
          nombre: valor.nombre,
          email: valor.email,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
    res.status(400).json({
      error: error,
    });
  }
});

// POST (Crear nuevos usuarios)
let crearUsuario = async function (body) {
  let usuario = new Usuario({
    email: body.email,
    nombre: body.nombre,
    password: body.password,
  });

  return await usuario.save();
};

// GET
let verUsuarios = async function () {
  let usuarios = await Usuario.find({ estado: true }).select({
    nombre: 1,
    email: 1,
  });
  return usuarios;
};

// PUT (actualizar)
ruta.put("/:email", (req, res) => {
  const { error, value } = schema.validate({
    nombre: req.body.nombre,
  });
  if (!error) {
    let resultado = actualizarUsuarios(req.params.email, req.body);
    resultado
      .then((valor) => {
        res.json({
          nombre: valor.nombre,
          email: valor.email,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
    res.status(400).json(error);
  }
});

let actualizarUsuarios = async function (email, body) {
  let usuario = await Usuario.findOneAndUpdate(
    email,
    {
      $set: {
        nombre: body.nombre,
        password: body.password,
      },
    },
    { new: true }
  );

  return usuario;
};

// DELETE
ruta.delete("/:email", (req, res) => {
  let resultado = desactivarUsuario(req.params.email);
  resultado
    .then((valor) => {
      res.json({
        nombre: valor.nombre,
        email: valor.email,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

let desactivarUsuario = async function (email) {
  let usuario = await Usuario.findOneAndUpdate(
    email,
    {
      $set: {
        estado: false,
      },
    },
    { new: true }
  );

  return usuario;
};
module.exports = ruta;
