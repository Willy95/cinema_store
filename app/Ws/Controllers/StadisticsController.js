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

}

module.exports = StadisticsController
