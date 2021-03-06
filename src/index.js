import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import auth from './routes/auth';
import events from './routes/events';
import { dbConnection } from './database/config';


dotenv.config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Lectura y parse del body
app.use( express.json() );

// Directorio Publico
const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

// Rutas
app.use( '/api/auth', auth )
app.use( '/api/events', events )


// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});