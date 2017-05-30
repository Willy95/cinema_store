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

const Ws = use('Ws');

// Ws.channel('assign_ticket', 'BusTicketController');
// CHAT
Ws.channel('online','ChatController').middleware('auth')
Ws.channel('online_room','RoomController').middleware('auth')
