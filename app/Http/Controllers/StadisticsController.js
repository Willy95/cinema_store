'use strict'

const Sales = use('App/Model/Mongo/SaleMongo')
const Movie = use('App/Model/Mongo/MovieMongo')
const Customer = use('App/Model/Mongo/CustomerMongo')
const Show = use('App/Model/Mongo/ShowMongo')

class StadisticsController {

  * sendView(req, res){
    return yield res.sendView('stadistics')
  }

  * getStadistics(req, res){
    Sales.find({}, (err, _sales) => {
      Show.populate(_sales, {path: 'show'}, (err, _sales) => {
        Movie.populate(_sales, {path: 'show.movie_id'}, (err, _sales) => {
          if (err){
            return res.send({
              status: 'c500',
              message: 'Error en el servidor de base de datos',
              data: err
            })
          }
          else {
            let activeShows = []
            if (_sales.length > 0){
              for (var i = 0; i < _sales.length; i++) {
                if (_sales[i].show.movie_id.active == 1){
                  activeShows.push(_sales[i])
                }
              }
            }
            return res.send({
              status: 'c200',
              message: 'success',
              data: activeShows
            })
          }
        })
      })
    })
  }

}

module.exports = StadisticsController
