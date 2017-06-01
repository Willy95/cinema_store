'use strict';

const mongoose = use('mongoose');
const schema = mongoose.Schema;

const MessageMongo = schema({
    user: { type: Object, required: true },
    time: { type: String, required: true },
    message: { type: Object, required: true },
    room: { type: Object, required: true }
},{collection:'messagemongos'},
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
