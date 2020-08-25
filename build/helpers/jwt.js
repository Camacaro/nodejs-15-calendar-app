"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generarJWT = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name
    };

    _jsonwebtoken.default.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      }

      resolve(token);
    });
  });
};

exports.generarJWT = generarJWT;