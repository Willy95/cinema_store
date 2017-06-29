'use strict'

class StadisticsController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }

  * onNewsale(status){
    try {
      this.socket.toEveryone().emit('onNewsale', status)
    } catch (e) {
      console.log(e);
    }
  }

  * onSetsiteelected(info){
    this.socket.toEveryone().exceptMe().emit('onSetsiteelected', info)
  }

}

module.exports = StadisticsController
