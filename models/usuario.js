const mongoose = require('mongoose')

const EsquemaUsuario = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    esCliente: Boolean,
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    esAdmin: Boolean,
    rol: String,
    fecha_creacion: { type: Date, default: Date.now }
})


const Usuario = mongoose.model('usuario', EsquemaUsuario) //coleccion en bd y esquema en mongosse

module.exports = Usuario