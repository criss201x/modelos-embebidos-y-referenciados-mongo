const mongosee = require('mongoose')
const express = require('express')
const Carro = require('../models/carro')
const { fabricante, Fabricante } = require('../models/fabricante')
const router = express.Router()
const { check, validationResult } = require('express-validator');

//trae todos los carros
router.get('/', async(req, res) => {
    const carros = await Carro
        .find()
        //.populate('fabricante', 'name pais') //muestra solo el pais
        .populate('fabricante') //accede a la coleccion fabricante y con ese id trae todos los datos del fabricante         
    res.send(carros)
})


router.get('/:id', async(req, res) => {
    const carro = await Carro.findById(req.params.id)
    if (!carro) return res.status(404).send('no sea encontrado un carro con ese id')
    res.send(carro)
})


//metodo post para documentos embebebidos 
router.post('/', [
    check('anio').isLength({ min: 3 }),
    check('modelo').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const fabricante = await Fabricante.findById(req.body.fabricanteId)
    if (!fabricante) return res.status(400).send('ese frabricante no existe')


    const carro = new Carro({
        fabricante: fabricante,
        modelo: req.body.modelo,
        anio: req.body.anio,
        vendido: req.body.vendido,
        precio: req.body.precio,
        extras: req.body.extras
    })
    const resultado = await carro.save()
    res.status(201).send(resultado)
})





//metodo post para documentos referenciados o normalizados
router.post('/', [
    check('modelo').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const carro = new Carro({
        fabricante: req.body.fabricante,
        modelo: req.body.modelo,
        anio: req.body.anio,
        vendido: req.body.vendido,
        precio: req.body.precio,
        extras: req.body.extras
    })
    const resultado = await carro.save()
    res.status(201).send(resultado)
})



//actualizar en bd con metodo put
router.put('/:id', [
    //check('fabricante').isLength({min: 3}),
    check('modelo').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const carro = await Carro.findByIdAndUpdate(req.params.id, {
        fabricante: req.body.fabricante,
        modelo: req.body.modelo,
        anio: req.body.anio,
        vendido: req.body.vendido,
        precio: req.body.precio,
        extras: req.body.extras
    }, {
        new: true //consultar documentacion https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    })

    if (!carro) {
        return res.status(404).send('ese carro no existe')
    }

    res.status(204).send()
})




//borrar de base de datos con metodo delete 
router.delete('/:id', async(req, res) => {

    const carro = await Carro.findByIdAndDelete(req.params.id)
    if (!carro) {
        return res.status(404).send('ese carro no no esiste')
    }
    res.status(200).send('el carro se borro')
})





module.exports = router