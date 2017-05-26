'use strict'
const Validator = use('Validator')
const Room = use('App/Model/Room')
const Database = use('Database')

const User = use('App/Model/User')
const Database = use('Database')

class ChatController {

    * viewChatRooms(req, res) {
        return yield res.sendView('ChatRooms');
    }

    * viewRegisterUser(req, res){
        return yield res.sendView('registerUser');
    }

    * viewChat(req, res){
        const rooms = yield Room.all()
        console.log(rooms.toJSON());
        return yield res.sendView('chat',{rooms: rooms.toJSON()})
    }

    * createRoom(req, res) {
        const data = request.only('admin','nameRoom')
        const rule = {
            admin: 'required',
            nameRoom: 'required'
        }
        const messages = {
            required: 'Llena todos los campos'
        }
        const validation = yield Validator.validate(data,rules,messages)
        if(validation.fails()){
            let res = validation.messages()[0].message
            return response.json({
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
            return response.json({
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
