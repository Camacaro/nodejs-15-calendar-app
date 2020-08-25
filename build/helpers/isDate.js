"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDate = (value, {
  req,
  location,
  path
}) => {
  // console.log({value, req, location, path })
  // Hay error
  if (!value) {
    return false;
  }

  const fecha = (0, _moment.default)(value);

  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

exports.isDate = isDate;