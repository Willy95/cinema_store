'use strict'

const UsersRoom = exports = module.exports = {}
const Database = use('Database')

UsersRoom.validReference = function * (next) {
    try {
        const user = this.user_id
        const room = this.room_id
        const exist = yield Database.from('users_rooms').where({ 'user_id': user, 'room_id': room })

        console.log(exist);
        console.log(exist.length);

        if (exist.length === 0) {
            yield next
        }

    } catch (e) {
        console.log(e);
    }
}
