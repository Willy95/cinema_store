'use strict'
const Validator = use('Validator')
const Room = use('App/Model/Room')
const Database = use('Database')
const User = use('App/Model/User')
const Users_room = use('App/Model/Users_room')
var file = require("fs")
const MessageMongo = use('App/Model/mongo/MessageMongo')

class ChatController {

    * viewChatRooms(req, res) {
        return yield res.sendView('ChatRooms');
    }

    * viewRegisterUser(req, res){
        return yield res.sendView('registerUser');
    }

    * viewChat(req, res){
        const rooms = yield Database.from('users_rooms')
        .innerJoin('rooms', 'users_rooms.room_id', 'rooms.id')
        .where({ 'users_rooms.user_id': req.auth.user.attributes.id })
        return yield res.sendView('chat', {roomers: rooms});
    }

    * createRoom(req, res) {
        const data = req.only('admin','nameRoom')
        const rules = {
            admin: 'required',
            nameRoom: 'required'
        }
        const messages = {
            required: 'Llena todos los campos'
        }
        const validation = yield Validator.validate(data,rules,messages)
        if(validation.fails()){
            let res = validation.messages()[0].message
            return res.json({
                status: 0,
                res: res
            })
            console.log(res);
        }else {
            let ext = ['.jpg','.png']
            let room = new Room()
            room.room_name = data.nameRoom
            room.active    = 1
            room.admin_id  = data.admin
            room.image    = "avatar" + Math.floor((Math.random() * 5) + 1) + ext[Math.floor((Math.random() * 2) + 1) - 1]
            yield room.save()
            let room_rel = new Users_room();
            room_rel.user_id = data.admin
            room_rel.room_id = room.id
            yield room_rel.save();
            return res.json({
                status: 1,
                res: 'Guardado exitosamente'
            })
        }
    }

    * findUsersToRoom (req, res){
        let params = req.params();
        let room = yield Database.from('rooms').where({ 'room_name': params.room }).limit(1)
        const users = yield Database.from('users')
        .innerJoin('users_rooms', 'users.id', 'users_rooms.user_id')
        .where({ active: 1, nickname: params.user })
        .where('users.id', '!=', req.auth.user.attributes.id)
        .where('users_rooms.room_id', '!=', room[0].id)
        console.log(users);
        res.json(users)
    }

    * getPublicRoom (req, res){

    }

    * createFile (req, res) {
        const param = req.only('room')
        MessageMongo.find({'message.room': param.room}).select('time message.message user.nickname').exec(function(error, object){
            if (error){
                console.log("================ ERROR 500 ===============");
                console.log(error);
                return res.json({
                    status: 500,
                    res: 'Falló al obtener los mensajes'
                })
            }
            else {
                if (object){
                    object.forEach(elem => {
                        file.appendFile(`conversacion-room-${elem.message.room}.txt`,
                            `${elem.user.nickname}: ${elem.message.message} \n`, function(err){
                                if (err) throw err;
                                console.log("archivo creado");
                            })
                    });
                    return res.json({
                        status: 200,
                        res: 'Archivo de conversación creado correctamente',
                        data: object
                    })
                }
                else {
                    return res.json({
                        status: 404,
                        res: 'No hay mensajes'
                    })
                }
            }
        });
    }

}

module.exports = ChatController
