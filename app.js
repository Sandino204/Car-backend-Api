const express = require('express')
const bodyParser = require('body-parser')

const CarDB = require('./model/carDB')

const app = express()

const fs = require('fs')

app.use(bodyParser.urlencoded({limit: '10mb' , extended: false}))
app.use(bodyParser.json())

app.use('/api', require('./routes/cars'))

app.use((req, res, next) => {
    const err = new Error('não encontrado')

    res.status(404)
    res.json({err: "Não encontrado"})
})

app.use((err, req, res, next) => {
    //console.log(err)
	res.status(500);
  	res.json({ erro: 'Erro na transação' });
});

const server = app.listen(3000, () => {
    const port = server.address().port

    console.log("Servidor iniciado em http://localhost:" + port)
})


