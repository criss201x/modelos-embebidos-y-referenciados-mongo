const express = require('express')
const Venta = require('../models/ventas')
const Carro = require('../models/carro')
const Usuario = require('../models/usuario')
const router = express.Router()
const mongoose = require('mongoose')


router.get('/', async(req, res) => {
    const ventas = await Venta.find()
    res.send(ventas)
})

router.post('/', async(req, res) => {
    const usuario = await Usuario.findById(req.body.usuarioId)
    if (!usuario) return res.status(400).send('Usuario no existe')

    const carro = await Carro.findById(req.body.carroId)
    if (!carro) return res.status(400).send('ese carro no existio')

    if (carro.vendido === true) return res.status(400).send('Ese carro ya hse vendio')

    const venta = new Venta({
        usuario: {
            _id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo
        },
        carro: {
            _id: carro._id,
            modelo: carro.model
        },
        precio: req.body.precio
    })

    //metodo normal

    /*const resultado = await venta.save()
    usuario.esCliente = true
    usuario.save()
    carro.venta = true
    carro.save()
    res.status(201).send(resultado)*/



    //  metodo transaccional
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const resultado = await venta.save()
        usuario.esCliente = true
        usuario.save()
        carro.vendido = true
        carro.save()
        await session.commitTransaction()
        session.endSession()
        res.status(201).send(resultado)
    } catch (e) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).send(e.message)
    }

})

module.exports = router