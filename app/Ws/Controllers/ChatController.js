'use strict'

class ChatController {

    constructor (socket, request) {
        this.socket = socket
        this.request = request
    }

    * onMessage(message) {
        this.socket.toEveryone().emit('message', message);
    }

    * disconnected(socket) {
        console.log('socket disconnected', socket.id);
    }

    * joinRoom (room) {
        const user = this.socket.currentUser;
    }


}

module.exports = ChatController
