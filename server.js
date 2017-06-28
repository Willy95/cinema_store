'use strict'

/*
|--------------------------------------------------------------------------
| Http Server
|--------------------------------------------------------------------------
|
| Here we boot the HTTP Server by calling the exported method. A callback
| function is optionally passed which is executed, once the HTTP server
| is running.
|
*/

const http = require('./bootstrap/http')
const mongoose = require('mongoose')

http(function () {
  use('Event').fire('Http.start')
})

mongoose.connect('mongodb://127.0.0.1:27017/cinema', (err, res) => {
    if (err){
        console.error("Error 500: " + err);
    }
    else{
        console.log("Conection successfull to Mongo Database");
    }
});
