/**
 * Moviesendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviesendpoint from './moviesendpoint.model';
var MoviesendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviesendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviesendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviesendpointEvents.emit(event + ':' + doc._id, doc);
    MoviesendpointEvents.emit(event, doc);
  }
}

export default MoviesendpointEvents;
