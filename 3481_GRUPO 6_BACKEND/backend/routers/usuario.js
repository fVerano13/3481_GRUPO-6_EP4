//este archivo es para rutear con post y get
const express = require('express')
//se declara la variable express que invoca a la librería express
const router = express.Router()
//se declara la variable router que usa el método Router de la librería express
const userController = require('../controllers/userController')
//se declara la variable userController que invoca al archivo userController de la carpeta controllers
router.post('/', userController.crearUsuario);
//cuando viene el router por el método post y este post sea invocación de la raíz llama al método crearUsuario
router.get('/', userController.obtenerUsuario);
//cuando viene el router por el método get y este get sea invocación de la raíz llama al método obtenerUsuario
module.exports = router
//se exporta el módulo con la variable router