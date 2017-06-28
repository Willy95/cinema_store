'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const RoomMongo = schema({

    numero: { type: String, required: true },
    cant_asientos: { type: String, required: true },
    tipo: { type: String, required: true },
    costo: { type: String, required: true }

},{collection: 'rooms'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('RoomMongo', RoomMongo)
