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

Route.get('/customer-register', 'CustomerController.renderPage')
Route.post('/save-customer', 'CustomerController.save')

// REGISTRO DE PELICULAS CONSUMIENDO UNA api
Route.get('/register-movie', 'MovieController.registerMovie')
