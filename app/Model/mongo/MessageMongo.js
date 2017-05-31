'use strict';

const mongoose = use('mongoose');
const schema = mongoose.Schema;

const MessageMongo = schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    genre: {type: String, required: true},
    image: {type: String, default: "null"},
    birthday: { type: Date, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    skipVersioning: {
        dontVersionMe: true
    }
});

module.exports = mongoose.model('MessageMongo', MessageMongo);
