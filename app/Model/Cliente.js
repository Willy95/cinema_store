'use strict'

const Mongo = use('Mongoose')

let ClienteSchema = Mongo.Schema({
    nombre:{type:String, required: true},
    apellido:{type:String, required: true},
    destino:{type:String, required: true},
    asiento:{type:Number, required: true}
}),{collection:'clientes'}

module.exports = Mongo.model('ClienteSchema',ClienteSchema)
