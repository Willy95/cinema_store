'use strict'

const Validator = use('Validator')
const Movie = use('App/Model/Mongo/MovieMongo')
const Cinema = use('App/Model/Mongo/CinemaMongo')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

class LandingController {

  * sendIndex(req, res){
    localStorage.setItem('cinema_selected', '5953cded401a95163ee76315')
    return yield res.sendView('index')
  }

  * sendMovie(req, res){
    let id = req.param('movie')
    localStorage.setItem('movie_selected', id)
    return yield res.sendView('single')
  }

  * sendMovieInfo(req, res){
    let id = localStorage.getItem('movie_selected')
    localStorage.removeItem('movie_selected')
    Movie.find({'_id': id}, (err, obj) => {
      if (err){
        return res.send({
          status: 'c500',
          message: 'Error en el servidor de base de datos'
        })
      }
      else {
        let cinema_id = localStorage.getItem('cinema_selected')
        Cinema.find({'_id': cinema_id}, (err, cinema) => {
          if (err){
            return res.send({
              status: 'c500',
              message: 'Error en el servidor de base de datos'
            })
          }
          else {
            return res.send({
              status: 'c200',
              message: 'success',
              data: {
                movie: obj,
                cinema: cinema
              }
            })
          }
        })
      }
    })
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
