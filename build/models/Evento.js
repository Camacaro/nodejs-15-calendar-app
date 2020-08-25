"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const EventoSchema = (0, _mongoose.Schema)({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});
EventoSchema.method('toJSON', function () {
  const {
    __v,
    _id,
    ...object
  } = this.toObject();
  object.id = _id;
  return object;
});

var _default = (0, _mongoose.model)('Evento', EventoSchema);

exports.default = _default;