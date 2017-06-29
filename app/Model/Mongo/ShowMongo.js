'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const ShowMongo = schema({

    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'rooms', required: true },
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MovieMongo', required: true },
    day: { type: String, required: true },
    hour: { type: String, required: true }

},{collection: 'shows'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('ShowMongo', ShowMongo)
