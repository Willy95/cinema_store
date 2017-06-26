'use strict'

class LandingController {

  * sendIndex(req, res){
    return yield res.sendView('index')
  }

  * sendMovie(req, res){
    return yield res.sendView('single')
  }

}

module.exports = LandingController
