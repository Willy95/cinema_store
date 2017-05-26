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

//Route.on('/').render('buy_ticket')
// Route.get('/','ClienteController.getDate')
// Route.post('/guardar','ClienteController.register')
//
// Route.post('/assigned-tickets','ClienteController.assigned')

Route.post('/assigned-tickets','ClienteController.assigned')

//************************************************************************//
// RUTAS DE CHAT

Route.get('/', 'UserController.registerView')
Route.post('/register', 'UserController.register')
Route.get('/login', 'UserController.loginView')
Route.post('/auth', 'UserController.auth')
Route.get('/logout', 'UserController.logOut')
Route.get('/chat/:room?','ChatController.viewChat').middleware('auth')
Route.post('/createRoom', 'ChatController.createRoom')
Route.get('/find-users/:user','ChatController.findUsersToRoom').middleware('auth')
