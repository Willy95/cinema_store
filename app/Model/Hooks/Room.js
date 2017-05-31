'use strict'

const Room = exports = module.exports = {}
const Database = use('Database')

Room.roomExist = function * (next) {

    try {
        const room = this.room_name
        const exist = yield Database.from('rooms').where({ 'room_name': room }).limit(1)

        if (exist.length == 0) {
            yield next
        }

    } catch (e) {
        console.log(e);
    }

}
