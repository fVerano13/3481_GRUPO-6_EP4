//este archivo será el controlador de usuarios
const jwt = require('jsonwebtoken')
//se declara una variable jwt que invoca a la librería JSON Web Token
const User = require('../models/User')
//se declara una variable User que invoca al archivo User de la carpeta models
const config = require('../config/global')
//se declara una variable config que invoca al archivo global de la carpeta config
exports.crearUsuario = async (req, res) => {
//se exporta el método crearUsuario que es asíncrono porque la creación de un usuario demora la función arrow tiene dos parámetros
//que indican que recibes un require(solicitud) y devuelves un response(respuesta) 
    try{
        const { username, email, password } = req.body
        //se declara una variable que a través de request vienen los datos del usuario específicamente por el body
        const user = new User(
        //se declara una variable user que va a ser un nuevo User(modelo) y recibe los valores como un JSON
            {
                username,
                email,
                password
            }
            //los tres campos del JSON no tiene valores porque asume que los valores de arriba son lo que colocará dentro del JSON
        )
        user.password = await user.encryptPassword(user.password)
        //a través del objeto user se invoca al elemento password
        //y le decimos que mediante un método await invocamos a user con su método encryptPassword
        await user.save()
        //mediante un método await enviamos a la base de datos al objeto user 
        //con el método save que guarda un JSON que se envía como parámetro a MongoDB 
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        //se declara la variable token que invoca al método sign de jwt para firmar y crear un token
        //en el primer parámtro de la firma se utiliza el id que esta dentro de userid
        //el segundo parámetro de la firma es la clave secreta que viene de config y de global
        //el tercer parámetro de la firma indica cuánto tiempo va a durar el token segundos, minutos y horas
        res.json({
            auth: true,
            token
        })
    }catch(error){
        console.log(error)
        //muestra el error en la consola
        res.status(500).send('Hubo un error')
        //la respuesta indica que hubo un error
    }
    //con try catch puedo detectar algún error con su variable llamada error
}

exports.obtenerUsuario = async (req, res) => {
    try {
      const { email, password } = req.query; // Usar query params en lugar de body
  
      // Validar si los campos email y password están presentes
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y password son obligatorios' });
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).send('El usuario no existe');
      }
  
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
      }
  
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24
      });
  
      res.json({ auth: true, token });
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
    }
  };