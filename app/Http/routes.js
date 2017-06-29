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
Route.get('/comprar-boletos', 'SalesController.sendViewToBuy')
Route.post('/getCinemas', 'LandingController.getCinemas')

// login
Route.get('/iniciar-sesion', 'LandingController.sendLogin')
Route.post('/login', 'LandingController.login')
Route.get('/logout', 'LandingController.logout')

// Registro de clientes
Route.get('/customer-register', 'CustomerController.renderPage')
Route.post('/save-customer', 'CustomerController.save')


// REGISTRO DE PELICULAS
Route.get('/management-movie', 'MovieController.sendView').middleware('auth')
Route.post('/register-movie', 'MovieController.saveMovie')//.middleware('auth')
Route.post('/movieToUpdate','MovieController.movieToUpdate').middleware('auth')
Route.post('/delete-movie','MovieController.deleteMovie').middleware('auth')


// Estadisticas
Route.get('/reporte-ventas-boletos', 'StadisticsController.sendView').middleware('auth')
Route.post('/getStadistics', 'StadisticsController.getStadistics').middleware('auth')

// Shows
Route.get('/administrar-funciones/:movie', 'ShowController.sendViewManage')
Route.post('/getInfoMovie', 'ShowController.getInfoMovie')
Route.post('/save-show', 'ShowController.saveShow').middleware('auth')
Route.post('/delete-show', 'ShowController.deleteShow').middleware('auth')

// rooms
Route.post('/getRoomsByType', 'RoomController.getRoomsByType')

// Movies
Route.post('/getMoviesAll', 'MovieController.getMoviesAll')

// Sales
Route.post('/getSalesInfo', 'SalesController.getSalesInfo')
Route.post('/saveBought', 'SalesController.saveBought')
