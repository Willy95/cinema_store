'use strict'

const Lucid = use('Lucid')

class Users_room extends Lucid {
    static boot() {
        super.boot()
        this.addHook('beforeCreate','UsersRoom.validReference')
    }
}

module.exports = Users_room
