'use strict'
const Validator = use('Validator')
const Room = use('App/Model/Room')
const Database = use('Database')
const User = use('App/Model/User')

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
        console.log(rooms);
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
        }else {
            let ext = ['.jpg','.png']
            let room = new Room()
            room.room_name = data.nameRoom
            room.active    = 1
            room.admin_id  = data.admin
            room.image    = "avatar" + Math.floor((Math.random() * 5) + 1) + ext[Math.floor((Math.random() * 2) + 1) - 1]
            yield room.save()
            return res.json({
                status: 1,
                res: 'Guardado exitosamente'
            })
        }
    }

    * findUsersToRoom (req, res){
        let params = req.params();
        const users = yield Database.from('users').where({ active: 1, nickname: params.user })
        res.json(users)
    }

}

module.exports = ChatController
