const mongoose = require('mongoose')

const ventasEsquema = new mongoose.Schema({
    usuario:{
        type: new mongoose.Schema({
            nombre: String,
            correo: String
        }),
        required: true
    },
    carro:{
        type: new mongoose.Schema({
            modelo: String
        }),
        required: true
    },
    precio: Number,
    fecha_de_creacion: {type: Date, default:Date.now}
})

const Venta = mongoose.model('venta', ventasEsquema)

module.exports = Venta