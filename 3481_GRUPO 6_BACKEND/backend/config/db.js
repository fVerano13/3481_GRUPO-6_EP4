//este archivo es para crear una conexión a la base de datos
const mongoose = require('mongoose')
//al declarar una variable llamada mongoose con ese contenido se invoca a la librería mongoose
const conectarDB = async () => {
//se declara una variable asíncrona que espera que se conecte a la base de datos para asignarle un valor a conectarDB y una función arrow
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/sistema', {
        //esperamos la conexion a través de mongoose con el método connect y dentro va la cadena de conexión y un JSON
            useNewUrlParser: true,
            //usa un url que va a llegar de tipo parser porque va a parsear un JSON porque MongoDB almacena JSON
            useUnifiedTopology: true
            //que tenga una unificación para que lo que este dentro del modelo lo replique dentro de la base de datos sistema
        })

    }catch(error){
        console.log(`Error en el servicio: ` + error)
        //muestra un texto en la consola
        process.exit(1)
        //para indicar que cuando haya un error salga del proceso 1 significa true o afirmativo
    }
    //con try catch puedo detectar algún error con su variable llamada error
}
module.exports = conectarDB
//se exporta el módulo con el método creado conectarDB para la conexión a la base de datos