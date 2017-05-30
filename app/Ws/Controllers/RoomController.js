'use strict'

const Database = use('Database')
const Users_room = use('App/Model/Users_room')

class RoomController {

    constructor (socket, request) {
        this.socket = socket
        this.request = request
    }

    * onMakeusersroom(object){
        let users = object.users
        let room  = object.room
        for (var i = 0; i < users.length; i++) {
            try {
                let myuser = yield Database.from('users').where({ 'nickname': users[i] }).limit(1)
                let room_obj = yield Database.from('rooms').where({ 'room_name': room }).limit(1)
                let room_rel = new Users_room()
                room_rel.user_id = myuser[0].id
                room_rel.room_id = room_obj[0].id
                var relaton = yield room_rel.save()
                this.socket.toEveryone().emit('onMakeusersroom', {
                    'user': myuser[0],
                    'room': room_obj[0]
                })
            } catch (e) {
                console.log("Error 500: ", e);
            }
        }
    }

    * leftRoomUser(user, room){
        try {
            yield Database.table('users_rooms').where({ 'user_id': user, 'room_id': room }).delete()
        } catch (e) {
            console.log(e);
        }
    }

    * joinRoom (room) {
        
    }

}

module.exports = RoomController
