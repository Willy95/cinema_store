'use strict'
const Movie = use('App/Model/Mongo/MovieMongo')
const Cinema = use('App/Model/Mongo/CinemaMongo')
const Validator = use('Validator')
const Helpers = use('Helpers')
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

class MovieController {

    * sendView(req, res) {

        const Movies = yield Movie.find({active: 1})
        const Cinemas = yield Cinema.find({active: 1})
        return yield res.sendView('movies_gest', { movies: Movies, cinemas: Cinemas })
    }

    * movieToUpdate (req, res) {
        Movie.find({}, function(err, movies){
            Cinema.populate(movies, {path: "cinema_id"}, function(err, movies){
                if (err) {
                    res.json({
                        status: 'error',
                        msj: 'server error',
                        error: err
                    })
                } else {
                    movies.forEach(elem => {
                        if (elem._id == req.input('id')) {
                            res.json({
                                status: '200',
                                msj: 'datos encontrados',
                                data: elem
                            })
                        }
                    });
                } // else />
            })
        })

        // return res.json({ data: movie })
    }

    * saveMovie(req, res) {
        // let data = req.all();
        // // console.log(req.all().poster);
        // let poster = req.file('poster')
        // return res.send(null)
        const poster = req.file('poster')
        const namePoster = Math.floor((Math.random() * 999999999999999999) + 1) + '.'+poster.extension()
        yield poster.move(Helpers.publicPath('/dist/images/'), namePoster)
        // < Validacion
        const data = req.only('nombre','sinopsis','actores','director','trailer','duracion','poster','idioma','cinema_id', 'tipo')
        const rules = {
            nombre: 'required',
            sinopsis: 'required',
            actores: 'required',
            director: 'required',
            trailer: 'required',
            duracion: 'required|min:2|max:3',
            idioma: 'required',
            cinema_id: 'required',
        }
        const messages = {
            required: 'Llena todos los campos',
            min: 'La duracion en minutos debe tener de 2 a 3 digitos'
        }
        const validation = yield Validator.validate(data,rules,messages)
        if (validation.fails()) {
            let response = validation.messages()[0].message
            res.json(response)
        } else {
            let movie = new Movie()
            movie.nombre = data.nombre
            movie.sinopsis = data.sinopsis
            movie.actores = data.actores
            movie.director = data.director
            movie.trailer = data.trailer
            movie.duracion = data.duracion
            movie.poster = namePoster
            movie.idioma = data.idioma
            movie.active = 1
            movie.cinema_id = data.cinema_id
            movie.tipo = data.tipo
            movie.save((err, _new) => {
              if (err){
                return res.send({
                  status: 'c500',
                  msj: 'Error en el servidor de base de datos',
                  data: err
                })
              }
              else {
                return res.send({
                  status: 'c200',
                  msj: 'Pelicula registrada',
                  data: _new
                })
              }
            })
        }

        // // Validacion />
    }

    * updateMovie(req, res) {

    }

    * deleteMovie(req, res) {
        const data = req.input('id')
        Movie.findById(data, function(err, movie){
            movie.active = 0
            movie.save(function(err){
                if (err) {
                    console.log('Error');
                }
            })
        })

        res.json({
            status:200
        })

    }

    // * registerMovie(req, res){
    //     const api = new Api()
    //     const args = {
    //         data:{ test: "hello" },
    //         headers: { "Content-Type": "application/json" }
    //     }
    //     let getMovies = () => {
    //         return new Promise((resolve, reject) => {
    //             api.post("http://filmdate-filmdate.rhcloud.com/api/api.php/getPeliculas",args, function (data,response){
    //                 console.log(data);
    //                 console.log(response);
    //                 if (data.result) {
    //                     return resolve('ok')
    //                 } else {
    //                     return reject('error')
    //                 }
    //             }).on('error',function (error) {
    //                 return reject('error')
    //             }).on('requestTimeout', function (req){
    //                 req.abort()
    //                 return reject('error')
    //             })
    //         })
    //     }
    //
    //     const result = yield getMovies().catch((error) => {
    //         return res.json({result: error})
    //     })
    //
    // }

    * getMoviesAll(req, res){
      try {
        let cinema_id = localStorage.getItem('cinema_selected')
        Movie.find({'cinema_id': cinema_id},  (err, obj) => {
          Cinema.populate(obj, {path: 'cinema_id'}, (err, obj) => {
            if (err){
              return res.send({
                status: 'c500',
                message: 'Error en el servidor',
                data: err
              })
            }
            else {
              if (obj){
                return res.send({
                  status: 'c200',
                  message: 'success',
                  data: obj
                })
              }
              else {
                return res.send({
                  status: 'c404',
                  message: 'No fue posible obtener respuesta',
                  data: null
                })
              }
            }
          })
        })
      } catch (e) {
        console.log(e);
      }
    }
}

module.exports = MovieController
