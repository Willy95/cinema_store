'use strict'

class BusTicketController {

    constructor(socket, request) {
        this.socket = socket
        this.request = request
        console.log('socket connected', socket.id);
    }

    onMessage(message) {
        this.socket.toEveryone().emit('message', message);
    }

    disconnected(socket){
        console.log('socket disconnected', socket.id);
    }

}

module.exports = BusTicketController
