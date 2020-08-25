"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarCampos = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

const validarCampos = (req, res = _express.response, next) => {
  // handle errors
  const errors = (0, _expressValidator.validationResult)(req); // si hay errores

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
};

exports.validarCampos = validarCampos;