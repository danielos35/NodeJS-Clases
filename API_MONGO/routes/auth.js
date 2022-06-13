const express = require("express");
const Usuario = require("../models/usuario_model");
const bcrypt = require("bcrypt");
const ruta = express.Router();

ruta.post("/", (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((datos) => {
      if (datos) {
        const passwordVlid = bcrypt.compareSync(
          req.body.password,
          datos.password
        );

        if (!passwordVlid)
          return res.status(400).json({
            error: "Ok.",
            msj: "mensaje o contraseña incorrecta.",
          });
        res.json(datos);
      } else {
        res.status(400).json({
          error: "Ok.",
          msj: "mensaje o contraseña incorrecta.",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        msj: "Error en el servicio" + err,
      });
    });
});

module.exports = ruta;
