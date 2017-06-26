'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const MovieMongo = schema({

    id: { type: ObjectId, required: true},
    title: { type: String, required: true },
    poster: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: Number, required: true },
    trailer: { type: String, required: true },
    synopsis: { type: String, required: true }

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
