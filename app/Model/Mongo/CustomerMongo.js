'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const CustomerMongo = schema({

    user: { type: String, required: true },
    card: { type: String, required: true }

},{collection: 'customers'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('CustomerMongo', CustomerMongo)
