'use strict'

const Lucid = use('Lucid')

class Cliente extends Lucid {
    static boot () {
        super.boot()
        this.addHook('beforeCreate','Cliente.generateCode')
    }
}

module.exports = Cliente

// *********************************************************** //

// const Mongo = use('Mongoose')
//
// let ClienteSchema = Mongo.Schema({
//     nombre:{type:String, required: true},
//     destino:{type:String, required: true},
//     asiento:{type:Number, required: true},
//     fecha:{type:String,required:true}
// },{collection:'clientes'})
//
// module.exports = Mongo.model('ClienteSchema',ClienteSchema)
