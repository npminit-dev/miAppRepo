import { datosRegistro, inicioSesionDatos } from '../interfaces&tuplas/tipos';
import { registrar, existeElMail, existeElAlias, iniciarSesion } from '../mismodulos/consultasFuncts'

const registrar_Controlador = async (req: any, res: any) => {
  let datosRegistro: datosRegistro = req.body
  let resultado: string
  try {
    if(!datosRegistro) throw new Error('body de la peticion vacio')
    let validacion = await Promise.all([existeElAlias(datosRegistro.Alias), existeElMail(datosRegistro.Email)])
    if(validacion.every(elem => elem === false)) {
      resultado = await registrar(datosRegistro);
      res.status(200).send(resultado)
    }
  } catch(err) {
    res.status(409).send(err)
  }
}

const iniciarSesion_Controlador = async (req: any, res: any) => {
  let datosSesion: inicioSesionDatos = req.body;
  try {
    if(!datosSesion) throw new Error('body de la peticion vacio')
    let jwt: string | undefined = await iniciarSesion(datosSesion.AliasUsuario, datosSesion.Contraseña)
    if(!jwt) res.status(500).send(new Error('Se ha devuelto un jwt undefined, chequear codigo'))
    res.status(200).send(jwt);
  } catch(err) {
    res.status(404).send(err)
  }
}

export default {
  registrar_Controlador,
  iniciarSesion_Controlador
}

