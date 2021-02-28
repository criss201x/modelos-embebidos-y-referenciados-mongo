//pendiente node modules npm i
const mongosee = require('mongoose')
const { fabricanteEsquema } = require('./fabricante')


const carroEsquema = new mongosee.Schema({ //esqumea y restricciones del esquema
    fabricante: {
        type: fabricanteEsquema, //metodo de referenciacion o normalizacion en mongo 
        required: true


        /*type: mongosee.Schema.Types.ObjectId, //metodo de referenciacion o normalizacion en mongo 
        ref: 'fabricante'*/



        /*type: String,
        required: true, //not null!!!!
        uppercase: true, //solo mayusculas
        trim: true, //que no se quiten espacios en blanco
        minlength: 2, //minimo dos caracteres
        maxlength: 99, //maximo 99 caracteres
        enum: ['BMW', 'AUDI', 'RENAULT'] //solo deja agregar uno de estos  campos*/

    },
    modelo: String,
    vendido: Boolean,
    precio: {
        type: Number,
        required: function() {
            return this.vendido
        }
    },
    anio: {
        type: Number,
        min: 2000,
        max: 2030
        get: y => Math.round(y) //redondea al entero mas cercano          
    },
    extras: [String],
    date: { type: Date, default: Date.now }
})

const Carro = mongosee.model('carros', carroEsquema) //carro con la primera en mayuscula hace referencia a una clase 

module.exports = Carro