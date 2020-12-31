const express = require('express')
const router = express.Router()
const CarDB = require('../model/carDB')
const exec = require('./util')

router.get('/', (req, res) => {
    res.send("API dos Carros")
})

router.get('/cars', exec(async(req, res) => {
    const cars = await CarDB.getCars()
    res.json(cars)
}))

router.get('/cars/:id(\\d+)', exec(async(req, res) => {
    const id = req.params.id

    const car = await CarDB.getCarroById(id);
    res.json(car)
}))

router.get('/cars/:type', exec(async(req, res) =>{
    const type = req.params.type

    const cars = await CarDB.getCarrosByTipo(type);
    res.json(cars);
}))

router.post('/cars', exec(async(req, res) => {
    const car = req.body
    const carR = await CarDB.save(car);
    res.json(carR);
}))

router.put('/car', exec(async(req, res) => {
    const car = req.body
    const carR = await CarDB.update(car);
    res.json({msg: 'Carro atualizado com sucesso.'});
}))

router.delete('/car/:id(\\d+)', exec(async(req, res) => {
    const id = req.params.id

    const affectedRows = await CarDB.deleteById(id);
    res.json({msg: affectedRows > 0 ? 'Carro deletado com sucesso.' : "Nenhum carro excluído."});
}))


module.exports = router