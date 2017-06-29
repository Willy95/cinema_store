'use strict'

const Validator = use('Validator')
const Movie = use('App/Model/Mongo/MovieMongo')
const Cinema = use('App/Model/Mongo/CinemaMongo')
const Show = use('App/Model/Mongo/ShowMongo')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

class LandingController {

  * sendIndex(req, res){
    let cinema = localStorage.getItem('cinema_selected')
    if (!cinema == null || !cinema == ""){
      return yield res.sendView('index')
    }
    else {
      return yield res.sendView('cinemas')
    }
  }

  * sendMovie(req, res){
    let id = req.param('movie')
    localStorage.setItem('movie_selected', id)
    return yield res.sendView('single')
  }

  * sendMovieInfo(req, res){
    let movie = localStorage.getItem('movie_selected')
    localStorage.removeItem('movie_selected')
    Show.find({movie_id: movie}, (err, objShow) => {
      Movie.populate(objShow, {path: 'movie_id'}, (err, objShow) => {
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
              movie: (objShow.length > 0) ? objShow[0].movie_id : null,
              shows: (objShow.length > 0) ? objShow[0].movie_id : null
            }
          })
        }
      })
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

  * forgetCinema(req, res){
    localStorage.removeItem('cinema_selected')
    return res.redirect('/')
  }

  * assignCinema(req, res){
    localStorage.setItem('cinema_selected', req.params('cinema'))
    return res.redirect('/')
  }

}

module.exports = LandingController
