'use strict'

/*
|-----------------------------------------------------------------------------
| Web Socket
|-----------------------------------------------------------------------------
|
| WebSocket provider makes it so simple for you to write realtime applications
| with the power of channels and dynamic rooms. Make use of this file to
| define channels and bind controllers next to them.
|
|
| @example
| Ws.channel('/chat', 'ChatController')
*/

const Ws = use('Ws')

Ws.channel('assign_ticket', 'BusTicketController');

// Ws.channel('assign_ticket', function(socket){
//     console.log('socket connected', socket.id);
//     socket.on('message', function(message){
//         socket.toEveryone().emit('message', message);
//         console.log('received message: ', message);
//     });
// }).disconnected(function (socket){
//     console.log('socket disconnected', socket.id);
// });
