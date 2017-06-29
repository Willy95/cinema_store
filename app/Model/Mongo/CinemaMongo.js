'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const CinemaMongo = schema({

    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    lat: { type: String, required: true },
    long: { type: String, required: true },
    active: { type: Number, required: true },

},{collection: 'cinemas'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('CinemaMongo', CinemaMongo)
