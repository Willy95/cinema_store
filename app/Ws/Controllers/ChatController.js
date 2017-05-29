'use strict'

class ChatController {

    constructor(socket, request) {
        this.socket = socket
        this.request = request
        console.log('socket connected', socket.id);
    }

    onMessage(object) {
        let msg = {user:null, time:null, message:null};
        msg.user = this.socket.currentUser.attributes
        msg.time = new Date(new Date().getTime()).toLocaleString()
        msg.message = object
        switch (object.type) {
            case "message":
                this.socket.toMe().emit('messageToMe', msg);
                this.socket.exceptMe().emit('message', msg);
            break;
            case "getFirstMessages":
                let messages = [{ room: object.room, message: "Bienvenido"}];
                this.socket.toMe().emit('firtMessages', messages);
            break;
        }
    }

    disconnected(socket){
        console.log('socket disconnected', socket.id);
    }

    * joinRoom (room) {

    }

}

module.exports = ChatController
