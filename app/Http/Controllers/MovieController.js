'use strict'

const Movie = use('App/Model/Movie')
const Validator = use('Validator')
const Api = require('node-rest-client').Client

class MovieController {

    * sendView(req, res) {
        return yield res.sendView('movies_gest')
    }

    * registerMovie(req, res){
        const api = new Api()
        const args = {
            data:{ test: "hello" },
            headers: { "Content-Type": "application/json" }
        }
        let getMovies = () => {
            return new Promise((resolve, reject) => {
                api.post("http://filmdate-filmdate.rhcloud.com/api/api.php/getPeliculas",args, function (data,response){
                    console.log(data);
                    console.log(response);
                    if (data.result) {
                        return resolve('ok')
                    } else {
                        return reject('error')
                    }
                }).on('error',function (error) {
                    return reject('error')
                }).on('requestTimeout', function (req){
                    req.abort()
                    return reject('error')
                })
            })
        }

        const result = yield getMovies().catch((error) => {
            return res.json({result: error})
        })

    }

}

module.exports = MovieController
