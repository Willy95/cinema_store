'use strict'

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

}

module.exports = ChatController
