const mysql = require('mysql')
const config = require('config')

class CarDB{
    static connect(){

        const dbConfig = config.get('mysqlConfig')

        const connection = mysql.createConnection(dbConfig)

        connection.connect()
        return connection
    }

    static getCars(callback){
        return new Promise((resolve, rej) => {
            let connection = CarDB.connect()
            let sql = 'select * from carro'
        
            let query = connection.query(sql, function(err, res, fields){
                if(err){
                    rej(err)
                    return
                }

                resolve(res)
            })

            connection.end()
        })
    }

    static getCarsByType(type, callback){

        return new Promise((resolve, reject) => {

            let connection = CarDB.connect()

            let sql = `
                select id, name, type
                from carro
                where type = '${type}'
                `
            
            let query = connection.query(sql, function(err, res,){
                if(err){
                    reject(err)
                    return
                }

                resolve(res)
            })

            connection.end()
        })
            
    }

    static getCarById(id, callback){

        return new Promise((resolve, reject) => {
            
            let connection = CarDB.connect()

            let sql = `
                select id, name, type
                from carro
                where id= ?`
            
            let query = connection.query(sql, id, function(err, res){
                if(err){
                    reject(err)
                    return
                }

                if(res.length === 0){
                    console.log("Nenhum carro encontrado")
                    return
                }

                let car = res[0]

                resolve(car)
            })

            connection.end()
        
        })
    }

    static save(car, callback){
        return new Promise((resolve, reject) => {
            let connection = CarDB.connect()

            let sql = `
                insert into carro
                set ?`

            let query = connection.query(sql, car, function(err, res){
                if(err){
                    reject(err)
                    return
                }

                car.id = res.insertId

                resolve(car)
            })

            connection.end()
        })
    }

    static update(car, callback){
        return new Promise((resolve, reject) => {
            let connection = CarDB.connect()

            let sql = `update carro 
                set ? 
                where id = ?`

            let id = car.id
            let query = connection.query(sql, [car, id], function(err, res){
                if(err){
                    reject(err)
                    return
                }

                resolve(car)
            })

            connection.end()
        })
    }

    static delete(car, callback){
        return new Promise((resolve, reject) => {
            let connection = CarDB.connect()

            let sql = `
                delete from carro
                where id = ?`
            
            let id = car.id

            let query = connection.query(sql, id, function(err, res){
                if(err){
                    reject(err)
                    return
                }

                resolve(car)
            })

            connection.end()
        })
    }

    static deleteById(id, callback){
        return new Promise((resolve, reject) => {
            let connection = CarDB.connect()

            let sql = `
                delete from carro 
                where id = ?`
            
            let query = connection.query(sql, id, function(err, res){
                if(err){
                    reject(err)
                    return 
                }

                resolve(res.affectedRows)
            })

            connection.end()
        })
        
    }

}

module.exports = CarDB
