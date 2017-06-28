'use strict'

const Movie = use('App/Model/Mongo/MovieMongo')
const Validator = use('Validator')
//const Api = require('node-rest-client').Client

class MovieController {

    * sendView(req, res) {
        const movies = yield Movie.find({})
        console.log(movies);
        return res.sendView('movies_gest', { movies: movies })
    }

    * saveMovie(req, res) {
        // < Validacion
        const data = req.only('nombre','sinopsis','actores','director','trailer','duracion','poster','idioma','cinema_id')

        const rules = {
            nombre: 'required',
            sinopsis: 'required',
            actores: 'required',
            director: 'required',
            trailer: 'required',
            duracion: 'required|min:2|max:3',
            poster: 'required',
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
            Movie.create(data)
        }

        // Validacion />
    }

    * updateMovie(req, res) {

    }

    * disabledMovie(req, res) {

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
}

module.exports = MovieController
