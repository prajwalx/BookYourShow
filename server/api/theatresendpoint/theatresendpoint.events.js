/**
 * Theatresendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Theatresendpoint from './theatresendpoint.model';
var TheatresendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheatresendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Theatresendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheatresendpointEvents.emit(event + ':' + doc._id, doc);
    TheatresendpointEvents.emit(event, doc);
  }
}

export default TheatresendpointEvents;
