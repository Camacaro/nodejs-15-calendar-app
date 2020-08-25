
import moment from 'moment'

export const isDate = ( value, { req, location, path }) => {

  // console.log({value, req, location, path })

  // Hay error
  if( !value ) {
    return false;
  }

  const fecha = moment( value );
  
  if( fecha.isValid() ) {
    return true
  } else {
    return false
  }
}