const mongoose = require('mongoose')


const fabricanteEsquema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },
    pais: String,
    fecha_creacion: {type: Date, default: Date.now}
})

const Fabricante = mongoose.model('fabricante', fabricanteEsquema)

module.exports.Fabricante = Fabricante
module.exports.fabricanteEsquema = fabricanteEsquema