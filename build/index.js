"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _events = _interopRequireDefault(require("./routes/events"));

var _config = require("./database/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // Crear el servidor de express


const app = (0, _express.default)(); // Base de datos

(0, _config.dbConnection)(); // CORS

app.use((0, _cors.default)()); // Lectura y parse del body

app.use(_express.default.json()); // Directorio Publico

app.use(_express.default.static('public')); // Rutas

app.use('/api/auth', _auth.default);
app.use('/api/events', _events.default); // Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});