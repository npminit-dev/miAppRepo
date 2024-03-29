import { datosRegistro, inicioSesionDatos, jwt, misDatos, tuplaNuevosDatos } from '../interfaces&tuplas/tipos';
import { registrar, existeElMail, existeElAlias, iniciarSesion, obtenerMisDatos, modificarMisDatos } from '../mismodulos/consultasFuncts'
import { agregarCeros, revertirFecha, verificarYDecodificarJWT } from '../mismodulos/utilidades';

const registrar_Controlador = async (req: any, res: any) => {
  let datosRegistro: datosRegistro = req.body
  let resultado: string
  try {
    if(!datosRegistro) throw new Error('body de la peticion vacio')
    let validacion = await Promise.all([existeElAlias(datosRegistro.Alias), existeElMail(datosRegistro.Email)])
    if(validacion.every(elem => elem === false)) {
      resultado = await registrar(datosRegistro);
      res.status(200).send(resultado)
    } else res.status(409).send(JSON.stringify(validacion))
  } catch(err) {
    res.status(404).send(err)
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

const datosCuenta_Controlador = async (req: any, res: any) => {
  let jwtcodificado: string = req.body;
  try {
    if(!jwtcodificado) throw new Error('body de la peticion vacio')
    let jwtdecodificado = await verificarYDecodificarJWT(jwtcodificado);
    let datosCuenta: misDatos[] = await obtenerMisDatos(jwtdecodificado as jwt)
    res.status(200).send(datosCuenta[0])
  } catch(err) {
    res.status(409).send(`Error ${err}`)
  }
}

const modificarDatos_Controlador = async (req: any, res: any) => {
  let jwtYNuevosDatos: [any, tuplaNuevosDatos] = req.body;
  try {
    jwtYNuevosDatos[0] = await verificarYDecodificarJWT(jwtYNuevosDatos[0]) as jwt
    jwtYNuevosDatos[1][3] = revertirFecha(agregarCeros(jwtYNuevosDatos[1][3]))
    let newjwt = await modificarMisDatos(...jwtYNuevosDatos)
    res.status(200).send(newjwt)
  } catch(err) {
    res.status(409).send(`Error ${err}`)
  }
}

const verificarAlias = async (req: any, res: any) => {
  try {
    if(!req.body) res.status(404).send('el body de la peticion se encuentra vacio')
    let existe: boolean | string = await existeElAlias(req.body)
    if(existe === false) res.status(200).send('false')
    else res.status(409).send(existe)
  } catch(error) {
    res.status(404).send(`Error ${error}`)
  }
}

export default {
  registrar_Controlador,
  iniciarSesion_Controlador,
  datosCuenta_Controlador,
  modificarDatos_Controlador,
  verificarAlias
}

