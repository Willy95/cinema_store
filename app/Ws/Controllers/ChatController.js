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
            let msg = {user:null, time:null, message:null, room: null};
            let theroom = yield Database.from('rooms').where({ 'room_name': object.room }).limit(1)
            msg.user = this.socket.currentUser.attributes
            msg.time = new Date(new Date().getTime()).toLocaleString()
            msg.message = object
            msg.room = theroom[0]
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
                var relation = yield room_rel.save()
                if (relation){
                    this.socket.toEveryone().emit('onMakeusersroom', {
                        'user': myuser[0],
                        'room': room_obj[0],
                        'me'  : this.socket.currentUser.attributes.id
                    })
                }
            } catch (e) {
                console.log("Error 500: ", e);
            }
        }
    }

    * onGetcontactsroom(room){
        try {
            let the_room  = yield Database.from('rooms').where({ 'room_name': room }).limit(1)
            let contacts = yield Database.from('users_rooms').innerJoin('users', 'users_rooms.user_id', 'users.id').where({ 'users_rooms.room_id': the_room[0].id})
            this.socket.toMe().emit('onGetcontactsroom', {contacts: contacts, room: the_room[0] })
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

    * onUpdatecontactsroom(data){
        console.log(data.room);
        console.log(data.user);
        this.socket.toEveryone().inRoom(data.room).emit('onUpdatecontactsroom', data)
    }

    disconnected(socket){
        console.log('socket disconnected', socket.id);
    }

    * joinRoom (room) {
        console.log("se unió al room " + room);
    }

    * leaveRoom (room, user){
        try {
            let myroom = yield Database.from('rooms').where({ 'room_name': room }).limit(1)
            if (myroom[0].admin_id !== user.id){
                yield Database.table('users_rooms').where({
                    'user_id': user.id,
                    'room_id': myroom[0].id
                }).delete()
            }
        } catch (e) {
            console.log(e);
        }
    }

    * onDeleteroom(object) {
        try {
            let the_room  = yield Database.from('rooms').where({ 'room_name': object.room }).limit(1)
            yield Database.from('users_rooms').where({ 'room_id': the_room[0].id }).delete()
            this.socket.toEveryone().emit('onDeleteroom', {
                message: 'Tu grupo fue borrado correctamente',
                room: object.room,
                me: this.socket.currentUser.attributes.id
            })

        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = ChatController
