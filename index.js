const mongoose = require('mongoose')
const express = require('express')
const app = express()
const carro = require('./routes/carro')
const usuario = require('./routes/usuario')
const fabricante = require('./routes/fabricante')
const venta = require('./routes/venta')
//const user = require('./routes/user')
//const company = require('./routes/company')
//const sale = require('./routes/sale')
//const auth = require('./routes/auth')

app.use(express.json())
app.use('/api/carro/', carro)
app.use('/api/usuario/', usuario)
app.use('/api/fabricante/', fabricante)
app.use('/api/venta/', venta)
//app.use('/api/user/', user)
//app.use('/api/company/', company)
//app.use('/api/sale/', sale)
//app.use('/api/auth/', auth)

const port = process.env.PORT || 3003

app.listen(port, ()=> console.log('Escuchando desde el puerto: ' + port))


mongoose.connect('mongodb://localhost/carros', {useNewUrlParser: true, useUnifiedTopology: true})//tener cuidado con la version de mongo que se esta usando se pueden generar advertencias 
//mongoose.connect('mongodb://localhost/carros', {useNewUrlParser:true, useFindAndModify:false, useCreateIndex: true})
    .then(()=> console.log('Conectado a MongoDb'))
    .catch(erro => console.log('error, no se ha podido conectar a mongo'))//exepcion
