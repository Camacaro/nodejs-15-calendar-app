"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminarEvento = exports.actualizarEvento = exports.crearEvento = exports.getEventos = void 0;

var _express = require("express");

var _Evento = _interopRequireDefault(require("../models/Evento"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getEventos = async (req, res = _express.response) => {
  // otro campo a devolcer = .populate('user', 'name password');
  const eventos = await _Evento.default.find().populate('user', 'name');
  res.json({
    ok: true,
    eventos
  });
};

exports.getEventos = getEventos;

const crearEvento = async (req, res = _express.response) => {
  const evento = new _Evento.default(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    });
  }
};

exports.crearEvento = crearEvento;

const actualizarEvento = async (req, res = _express.response) => {
  const uid = req.uid;
  const eventoId = req.params.id;

  try {
    const evento = await _Evento.default.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    const nuevoEvento = { ...req.body,
      user: uid
    }; // Retornar los datos actualizado

    const eventoActualizado = await _Evento.default.findByIdAndUpdate(eventoId, nuevoEvento, {
      new: true
    });
    return res.status(200).json({
      ok: true,
      evento: eventoActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    });
  }
};

exports.actualizarEvento = actualizarEvento;

const eliminarEvento = async (req, res = _express.response) => {
  const uid = req.uid;
  const eventoId = req.params.id;

  try {
    const evento = await _Evento.default.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      });
    }

    await _Evento.default.findByIdAndDelete(eventoId);
    return res.status(200).json({
      ok: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    });
  }
};

exports.eliminarEvento = eliminarEvento;