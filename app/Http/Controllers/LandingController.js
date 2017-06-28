'use strict'

const Validator = use('Validator')

class LandingController {

  * sendIndex(req, res){
    return yield res.sendView('index')
  }

  * sendMovie(req, res){
    return yield res.sendView('single')
  }

  * sendLogin(req, res){
    return yield res.sendView('login')
  }

  * login(req, res) {
    const data = req.all().data
    const rules = {
      email: 'required',
      password: 'required'
    }
    const messages = {
      required: 'Llena todos los campos'
    }
    const validation = yield Validator.validate(data, rules, messages)
    if (validation.fails()) {
      let resp = validation.messages()[0].message
      return res.send({
        status: 'c404',
        message: resp
      })
    } else {
      try {
        const login = yield req.auth.attempt(data.email, data.password)
        if (login) {
          return res.send({
            status: 'c200',
            message: `Bienvenido ${data.email}`
          })
        }
      } catch (err) {
        console.log(err);
        return res.send({
          status: 'c403',
          message: 'Credenciales no validas'
        })
      }
    }
  }

  * logout(req, res){
    yield req.auth.logout()
    return res.redirect('/')
  }

}

module.exports = LandingController
