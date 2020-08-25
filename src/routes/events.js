

import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWY } from '../middlewares/validar-jwt';
import { 
 getEventos,
 crearEvento,
 actualizarEvento,
 eliminarEvento 
} from '../controllers/events';
import { validarCampos } from '../middlewares/validar-campos';
import { isDate } from '../helpers/isDate';

/**
 * Rutas de Eventos / Events
 * host + /api/events
 */

const router = Router();

router.use( validarJWY );

router.get('/',  getEventos)

router.post(
  '/', 
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
    validarCampos
  ],
  crearEvento
)

router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
    validarCampos
  ],
  actualizarEvento
)

router.delete('/:id',  eliminarEvento)

export default router;