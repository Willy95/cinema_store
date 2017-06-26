'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const CinemaMongo = schema({

    id: { type: ObjectId, required: true},
    name: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: String, required: true },
    long: { type: String, required: true },
    active: { type: String, required: true },

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
