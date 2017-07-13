/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import MoviesendpointEvents from './moviesendpoint.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  console.log('SOCKET REGISTERED: Bind model events to socket events');
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('moviesendpoint:' + event, socket);

    MoviesendpointEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
    console.log('Created listener');
    console.log(doc+':event');
  };
}

function removeListener(event, listener) {
  return function() {
    MoviesendpointEvents.removeListener(event, listener);
    console.log('Remove listener');
  };
}
