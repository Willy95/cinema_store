'use strict'

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
        return yield res.sendView('chat');
    }

    * findUsersToRoom (req, res){
        let params = req.params();
        const users = yield Database.from('users').where({ active: 1, nickname: params.user })
        res.json(users)
    }

}

module.exports = ChatController
