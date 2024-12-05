//este archivo es para usar JSON Web Token
const jwt = require('jsonwebtoken')
//al declarar una variable llamada jwt con ese contenido se invoca a la librería jsonwebtoken
const config = require('./global')
//al declarar una variable llamada config con ese contenido se importa al archivo global
function verifyToken(req, res, next) {
//se crea la función verifyToken que tiene tres parámetros y vas a escuchar un request(solicitud) y vas a devolver a través de un response(respuesta)
//y ejecuta una sentencia next es para que la solicitud no se quede estancada
    const token = req.headers['x-access-token']
    //se crea una variable token que solicita el encabezado de x-access-token
    if(!token) {
    //condicional SI viene algo diferente a true dentro de la variable token o sea que no vino nada se ejecuta lo de abajo
        return res.status(404).json({
        //retorna a través del response un status 404 Not Found(No Encontrado) con un JSON
            auth: false,
            //indica que la autorización es falsa
            message: 'No hay Token'
            //indica que no hay token
        })
    }

    const decoded = jwt.verify(token, config.secret)
    //se declara la variable decoded que usa el método verify de JWT para verificar el token con la palabra secreta de config
    req.userId = decoded.userId
     //del require viene un userId y tiene que ser igual al userId decodificado ya que cuándo tokenizas lo haces al Id del usuario
    next()
    //le digo que continue
}

module.exports = verifyToken
//se exporta el módulo con el método creado verifyToken para la verificación del token