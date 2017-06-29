'use strict'

const mongoose = use('mongoose')
const schema = mongoose.Schema

const SaleMongo = schema({

    show: { type: mongoose.Schema.Types.ObjectId, ref: 'shows', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'rooms', required: true },
    site_num: { type: String, required: true }

},{collection: 'sales'},{

    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersion: true
    }

})

module.exports = mongoose.model('SaleMongo', SaleMongo)
