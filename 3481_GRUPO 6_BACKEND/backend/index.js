//este es el archivo principal para construir el servidor de node
const express = require('express')
//se declara la variable express que invoca a la librería express
const conectarBD = require('./config/db')
//se declara una variable conectarDB que invoca al archivo db de la carpeta config
const config = require('./config/global')
//se declara una variable config que invoca al archivo global de la carpeta config
const cors = require('cors')
//se declara la variable cors que invoca a la librería cors de express
const app = express()
//con esto se inicializa a express
conectarBD()
//con esto se inicializa el método conectarDB
app.use(cors())
//con esto la app usa a cors para las referencias cruzadas
app.use(express.json())
//con esto se habilita para recibir valores JSON
app.use('/api/create-user', require('./routers/usuario'))
//cada vez que se invoca invoca al archivo usuario de la carpeta routers
app.use('/api/login', require('./routers/usuario'))
//cada vez que se invoca invoca al archivo usuario de la carpeta routers
app.listen(config.port, () => {
//con esto indica que va a escuchar en el puerto establecido en config recibe una función arrow
    console.log(`El servidor corriendo en el puerto: ${config.port}`)
    //se muestra un mensaje en la consola indicando el puerto
})