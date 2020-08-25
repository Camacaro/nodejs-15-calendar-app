
import { response } from 'express'
import Evento from '../models/Evento'

export const getEventos = async  (req, res = response ) => {

  // otro campo a devolcer = .populate('user', 'name password');
  const eventos = await Evento.find().populate('user', 'name');

  res.json({
    ok: true,
    eventos
  })
}

export const crearEvento = async (req, res = response ) => {

  const evento = new Evento( req.body )

  try {

    evento.user = req.uid;
    
    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    })
  }
}

export const actualizarEvento = async (req, res = response ) => {

  const uid = req.uid
  const eventoId = req.params.id;

  try {

    const evento = await Evento.findById(eventoId)

    if( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }

    if( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    // Retornar los datos actualizado
    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

    return res.status(200).json({
      ok: true,
      evento: eventoActualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    })
  }
}

export const eliminarEvento = async (req, res = response ) => {

  const uid = req.uid
  const eventoId = req.params.id;

  try {

    const evento = await Evento.findById(eventoId)

    if( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }

    if( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      })
    }

    await Evento.findByIdAndDelete(eventoId);

    return res.status(200).json({
      ok: true,
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el adminstrador'
    })
  }
}