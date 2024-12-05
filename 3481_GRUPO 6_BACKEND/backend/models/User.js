//este archivo es para crear un modelo
const { Schema, model } = require('mongoose')
//se declara una variable de tipo schema y model que invoca a la librería mongoose
const bcrypt = require('bcryptjs')
//se declara una variable bcrypt que invoca a la librería bcryptjs
const userSchema = new Schema({
//se declara una variable userSchema que contiene un nuevo Schema y contiene un JSON
    username: String,
    email: String,
    password: String
    //los tres campos son de tipo cadena
}, {
    timestamps: true
    //esto indica que tal cual como venga el esquema lo replique en la base de datos 
})
userSchema.methods.encryptPassword = async (password) => {
//a userSchema se le crea un método asíncrono de encriptación que recibe como parámetro password para la función arrow
    const salt = await bcrypt.genSalt(10)
    //se declara una variable salt que va a esperar al objeto bcrypt con el método genSalt
    //que tiene como parámetro 10 que genera el algoritmo de encriptación que va a hacer saltos
    return bcrypt.hash(password, salt)
    //retorna el objeto bcrypt con el método hash que recibe como parámetros password y utiliza el salt recién creado
    //hash es un arreglo que se ha alterado y llenado de caracteres bajo el algoritmo genSalt a partir del valor password
}
userSchema.methods.validatePassword = function(password){
//a userSchema se le crea un método de desencriptación que recibe como parámetro password para la función
    return bcrypt.compare(password, this.password)
    //retorna  el objeto bcrypt con el método decrypt que recibe como parámetros password y la cadena a desencriptar que esta dentro de userSchema
}
module.exports = model('User', userSchema)
//se exporta el módulo con el modelo con valor de User y al método userSchema que es un objeto de la clase Schema