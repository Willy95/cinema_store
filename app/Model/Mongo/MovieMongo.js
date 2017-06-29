'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const MovieMongo = schema({

    nombre: { type: String, required: true },
    sinopsis: { type: String, required: true },
    actores: { type: String, required: true },
    director: { type: String, required: true },
    trailer: { type: String, required: true },
    duracion: { type: String, required: true },
    poster: { type: String, required: true },
    idioma: { type: String, required: true },
    active: { type: String, required: true },
    tipo: { type: String, required: true },
    cinema_id: { type: mongoose.Schema.Types.ObjectId, ref: "cinemas", required: true }

},{collection: 'movies'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('MovieMongo', MovieMongo)
