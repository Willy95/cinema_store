'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
    static boot() {
        super.boot()
        this.addHook('beforeCreate','User.userExist')
    }
}

module.exports = User
