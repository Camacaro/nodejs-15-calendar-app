import { response } from 'express'

import { validationResult } from 'express-validator'

export const validarCampos = (req, res = response, next) => {

  // handle errors
  const errors = validationResult( req )

  // si hay errores
  if( !errors.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  next();
}