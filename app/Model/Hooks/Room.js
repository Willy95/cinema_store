'use strict'

const Room = exports = module.exports = {}

Room.roomExist = function * (next) {

    const room = this.room_name
    const exist = yield this.query().where('room_name',room).fetch()

    if (exist) {
        console.log("exist");
    } else {
        console.log("no exist");
    }

  yield next
}
