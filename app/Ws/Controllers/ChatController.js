'use strict'

class ChatController {

    constructor(socket, request) {
        this.socket = socket
        this.request = request
        console.log('socket connected', socket.id);
    }

    onMessage(object) {
        switch (object.type) {
            case "message":
                this.socket.toMe().emit('messageToMe', object);
                this.socket.exceptMe().emit('message', object);
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

    joinRoom (room) {
        console.log(room);
        const user = this.socket.currentUser;
    }

}

module.exports = ChatController
