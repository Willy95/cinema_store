'use strict'

const User = exports = module.exports = {}
const Database = use('Database')

User.userExist = function * (next) {
    try {
        const nickname = this.nickname
        const exist = yield Database.from('users').where({ 'nickname': nickname })

        console.log(exist.length);

        if (exist.length === 0) {
            yield next
        }

    } catch (e) {
        console.log(e);
    }
}
