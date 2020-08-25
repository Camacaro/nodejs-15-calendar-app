"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revalidarToken = exports.loginUsuario = exports.crearUsuario = void 0;

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _jwt = require("../helpers/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const crearUsuario = async (req, res = _express.response) => {
  const {
    email,
    password
  } = req.body;

  try {
    let usuario = await _Usuario.default.findOne({
      email
    });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      });
    }

    usuario = new _Usuario.default(req.body); // Encriptar contraseña

    const salt = _bcryptjs.default.genSaltSync();

    usuario.password = _bcryptjs.default.hashSync(password, salt);
    await usuario.save();
    const token = await (0, _jwt.generarJWT)(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
};

exports.crearUsuario = crearUsuario;

const loginUsuario = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    const usuario = await _Usuario.default.findOne({
      email
    });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email'
      });
    } // Confirmar los passwords


    const validPassword = _bcryptjs.default.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    } // Generar nuestro JWT


    const token = await (0, _jwt.generarJWT)(usuario.id, usuario.name);
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
};

exports.loginUsuario = loginUsuario;

const revalidarToken = async (req, res) => {
  const {
    uid,
    name
  } = req;
  const token = await (0, _jwt.generarJWT)(uid, name);
  res.json({
    ok: true,
    msg: 'renew',
    token
  });
};

exports.revalidarToken = revalidarToken;