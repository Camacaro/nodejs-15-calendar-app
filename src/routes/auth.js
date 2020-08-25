import { Router } from 'express';
import { check } from 'express-validator'
import { crearUsuario, revalidarToken, loginUsuario } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWY } from '../middlewares/validar-jwt';

/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const router = Router();

router.post(
  '/new', 
  [ 
    check('name', 'El nombre es obligatorio').not().isEmpty(), 
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  crearUsuario
)

router.post(
  '/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario
)

router.get('/renew', validarJWY, revalidarToken )

export default router;