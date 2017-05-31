'use strict'

const Database = use('Database')
const Users_room = use('App/Model/Users_room')
const mongoose = use('Mongoose')
const MessageMongo = use('App/Model/mongo/MessageMongo')

class ChatController {
    constructor(socket, request, presence) {
        this.socket = socket
        this.request = request
        console.log('socket connected', socket.id);
        presence.track(socket, socket.currentUser.id,{
            nickname: socket.currentUser.nickname,
            image: socket.currentUser.image
        })
    }

    * onMessage(object) {
        try {
            let msg = {user:null, time:null, message:null};
            msg.user = this.socket.currentUser.attributes
            msg.time = new Date(new Date().getTime()).toLocaleString()
            msg.message = object
            let new_message = new MessageMongo(msg)
            new_message.save()
            this.socket.toEveryone().inRoom(object.room).emit('onMessage', msg)
        } catch (e) {
            console.log("======== ERROR 500 ========");
            console.log("Message Error : ", e);
            console.log("===========================");
        }
    }

    * onGetmyinfo(obj){
        this.socket.toMe().emit('onGetmyinfo', this.socket.currentUser.attributes);
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

    * onGetcontactsroom(room){
        try {
            let the_room  = yield Database.from('rooms').where({ 'room_name': room }).limit(1)
            let contacts = yield Database.from('users_rooms').innerJoin('users', 'users_rooms.user_id', 'users.id').where({ 'users_rooms.room_id': the_room[0].id})
            this.socket.toMe().emit('onGetcontactsroom', contacts)
        } catch (e) {
            console.log(e);
        }
    }

    * onGetmessagesroom(room){
        try {
            MessageMongo.find({'message.room': room}, (error, response) => {
                if (error){ console.log(error) }
                else {
                    this.socket.toMe().emit('onGetmessagesroom', response)
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    disconnected(socket){
        console.log('socket disconnected', socket.id);
    }

    * joinRoom (room) {
        console.log("se unió al room " + room);
    }

    // * leftRoomUser(user, room){
    //     try {
    //         yield Database.table('users_rooms').where({ 'user_id': user, 'room_id': room }).delete()
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    * onLeftRoom(object) {
        try {
            const res = `responsiendo ${object.user}`
            this.socket.toMe().emit('onLeftRoom', res)

        } catch (err) {
            console.log(error);
        }
    }

}

module.exports = ChatController
