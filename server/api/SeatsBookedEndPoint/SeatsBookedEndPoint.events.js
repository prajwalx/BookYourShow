/**
 * SeatsBookedEndPoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import SeatsBookedEndPoint from './SeatsBookedEndPoint.model';
var SeatsBookedEndPointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeatsBookedEndPointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SeatsBookedEndPoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SeatsBookedEndPointEvents.emit(event + ':' + doc._id, doc);
    SeatsBookedEndPointEvents.emit(event, doc);
  }
}

export default SeatsBookedEndPointEvents;
