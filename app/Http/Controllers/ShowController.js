'use strict'

const Movie = use('App/Model/Mongo/MovieMongo')
const Cinema = use('App/Model/Mongo/CinemaMongo')
const RoomMongo = use('App/Model/Mongo/RoomMongo')
const Show = use('App/Model/Mongo/ShowMongo')
const mongoose = use('mongoose')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

class ShowController {

  * sendViewManage(req, res){
    localStorage.setItem('movie_show', "59542da4401a95163ee76325")
    return yield res.sendView('assign_shows')
  }

  * getInfoMovie(req, res){
    let movie_id = localStorage.getItem('movie_show')
    Movie.find({'_id': movie_id}, (err, movie) => {
      if (err){
        return res.send({
          status: 'c500',
          message: 'Error en el servidor de base de datos',
          data: err
        })
      }
      else {
        Show.find({'movie_id': movie_id}, (err, shows_stored) => {
          RoomMongo.populate(shows_stored, {path: 'room_id'}, function(err, shows_stored){
            if (err){
              return res.send({
                status: 'c500',
                message: 'Error en el servidor de base de datos',
                data: err
              })
            }
            else {
              return res.send({
                status: 'c200',
                message: 'success',
                data: {
                  movie: movie[0],
                  shows: shows_stored
                }
              })
            }
          })
        })
      }
    })
  }

  * saveShow(req, res){
    let data = req.all()
    let movie_id = localStorage.getItem('movie_show')

    Show.find({day: data.date, 'room_id': data.room}, (err, shows) => {
      Movie.populate(shows, {path: 'movie_id'}, (err, shows) => {
        if (err){
          return res.send({
            status: 'c500',
            message: 'Error en el servidor de base de datos',
            date: err
          })
        }
        else {
          if (shows.length > 0){
            let good = true;
            for (var i = 0; i < shows.length; i++) {
              let strTime = shows[i].movie_id.duracion
              let strDuration = strTime.replace(" min", '')
              let fulltime = 
              console.log('duracion: ', strDuration);
            }
            return res.send({
              hola: 1
            })
          }
          else {
            return res.send({
              hola: 0
            })
          }
        }
      })
    })

    // let show = new Show();
    // show.room_id = data.room
    // show.movie_id = movie_id
    // show.day = data.date
    // show.hour = data.hour
    // show.save((err, stored) => {
    //   if (err){
    //     return res.send({
    //       status: 'c500',
    //       message: 'Error en el servidor de base de datos',
    //       date: err
    //     })
    //   }
    //   else {
    //     return res.send({
    //       status: 'c200',
    //       message: 'success',
    //       data: stored
    //     })
    //   }
    // })
  }

  callback(res){
    console.log(res);
  }

}

module.exports = ShowController
