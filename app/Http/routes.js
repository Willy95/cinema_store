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
Route.get('/pelicula', 'LandingController.sendMovie')

// login
Route.get('/iniciar-sesion', 'LandingController.sendLogin')
Route.post('/login', 'LandingController.login')
Route.get('/logout', 'LandingController.logout')

// Registro de clientes
Route.get('/customer-register', 'CustomerController.renderPage')
Route.post('/save-customer', 'CustomerController.save')

// REGISTRO DE PELICULAS CONSUMIENDO UNA API
Route.get('/management-movie', 'MovieController.registerMovie')
Route.get('/register-movie', 'MovieController.registerMovie')

// Estadisticas
Route.get('/reporte-ventas-boletos', 'StadisticsController.sendView')

// Shows
Route.get('/administrar-funciones', 'ShowController.sendViewManage')

// rooms
Route.post('/getRoomsByType', 'RoomController.getRoomsByType')
