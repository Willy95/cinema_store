'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'LandingController.sendIndex')
Route.get('/olvidar-cine', 'LandingController.forgetCinema')
Route.get('/pelicula/:movie', 'LandingController.sendMovie')
Route.post('/pelicula-info', 'LandingController.sendMovieInfo')
Route.get('/asignar-cine/:cinema', 'LandingController.assignCinema')

// login
Route.get('/iniciar-sesion', 'LandingController.sendLogin')
Route.post('/login', 'LandingController.login')
Route.get('/logout', 'LandingController.logout')

// Registro de clientes
Route.get('/customer-register', 'CustomerController.renderPage')
Route.post('/save-customer', 'CustomerController.save')

// REGISTRO DE PELICULAS CONSUMIENDO UNA API
Route.get('/management-movie', 'MovieController.sendView')
Route.get('/register-movie', 'MovieController.registerMovie')
Route.post('/movieToUpdate','MovieController.movieToUpdate')

// Estadisticas
Route.get('/reporte-ventas-boletos', 'StadisticsController.sendView')
Route.post('/getStadistics', 'StadisticsController.getStadistics')

// Shows
Route.get('/administrar-funciones', 'ShowController.sendViewManage')
Route.post('/getInfoMovie', 'ShowController.getInfoMovie')
Route.post('/save-show', 'ShowController.saveShow')
Route.post('/delete-show', 'ShowController.deleteShow')

// rooms
Route.post('/getRoomsByType', 'RoomController.getRoomsByType')

// Movies
Route.post('/getMoviesAll', 'MovieController.getMoviesAll')
