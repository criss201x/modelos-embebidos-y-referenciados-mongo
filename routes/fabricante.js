const express = require('express')
const {Fabricante} = require('../models/fabricante')
const router = express.Router()


//traer todos 
router.get('/', async(req, res)=> {
    const fabricantes = await Fabricante.find()
    res.send(fabricantes)
})


//traer uno
router.get('/:id', async(req, res)=>{
    const fabricante = await Company.findById(req.params.id)
    if(!fabricante) return res.status(404).send('ese fabricante no existe')
    res.send(fabricante)
})


//agregar
router.post('/',async(req, res)=>{

    const fabricante = new Fabricante({
        nombre: req.body.nombre,
        pais: req.body.pais
    })

    const resultado = await fabricante.save()
    res.status(201).send(resultado)
})

router.put('/:id', async (req, res)=>{

    const fabricante = await Fabricante.findByIdAndUpdate(req.params.id,{
        nombre: req.body.nombre,
        pais: req.body.pais
    },
    {
        new: true
    })

    if(!fabricante){
        return res.status(404).send('ese fabricante no existe')
    }
    
    res.status(204).send()
})

router.delete('/:id', async(req, res)=>{

    const company = await Company.findByIdAndDelete(req.params.id)

    if(!company){
        return res.status(404).send('El coche con ese ID no esta, no se puede borrar')
    }

    res.status(200).send('coche borrado')

})

module.exports = router