'use strict'

const Movie = use('App/Model/Movie')
const Validator = use('Validator')
const Api = require('node-rest-client').Client

class MovieController {

    * registerMovie(req, res){

        const api = new Api()
        const args = {
            data:{ test: "hello" },
            headers: { "Content-Type": "application/json" }
        }
        api.post("http://filmdate-filmdate.rhcloud.com/api/api.php/getPeliculas",args, function (data,response){
            console.log(data);
            console.log(response);
        })

        return res.json({
            msj:'Listo'
        })

    }

}

module.exports = MovieController
