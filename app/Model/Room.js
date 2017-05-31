'use strict'

const Lucid = use('Lucid')

class Room extends Lucid {
    static boot() {
        super.boot()
        this.addHook('beforeCreate','Room.roomExist')
    }
}

module.exports = Room
