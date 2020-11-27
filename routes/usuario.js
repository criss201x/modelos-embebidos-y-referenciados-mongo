const mongosee = require('mongoose')
const express = require('express')
const Usuario = require('../models/usuario')
const router = express.Router()
const { check, validationResult } = require('express-validator');



//ver todos 
router.get('/', async(req, res)=> {
    const usuarios = await Usuario.find()
    res.send(usuarios)
})


//ver uno 
router.get('/:id', async(req, res)=>{
    const usuario = await Usuario.findById(req.params.id)
    if(!usuario) return res.status(404).send('el usuario no existe')
    res.send(usuario)
})


//agregar usuario
router.post('/', [
    check('nombre').isLength({min: 3}),
    check('correo').isLength({min: 3}),
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    usuario = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,    
        esCliente: req.body.esCliente
    })

    const resultado = await usuario.save()
    res.status(201).send(resultado)

})

router.put('/:id', [
    check('nombre').isLength({min: 3}),
    check('correo').isLength({min: 3}),
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id,{
        nombre: req.body.nombre,
        correo: req.body.correo,    
        esCliente: req.body.esCliente
    },
    {
        new: true
    })

    if(!usuario){
        return res.status(404).send('ese usuario no existe')
    }
    
    res.status(204).send()
})

router.delete('/:id', async(req, res)=>{

    const usuario = await Usuario.findByIdAndDelete(req.params.id)

    if(!usuario){
        return res.status(404).send('El user con ese ID no esta, no se puede borrar')
    }

    res.status(200).send('usuario borrado')

})

module.exports = router