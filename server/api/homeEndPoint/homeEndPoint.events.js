/**
 * HomeEndPoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import HomeEndPoint from './homeEndPoint.model';
var HomeEndPointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HomeEndPointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  HomeEndPoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HomeEndPointEvents.emit(event + ':' + doc._id, doc);
    HomeEndPointEvents.emit(event, doc);
  }
}

export default HomeEndPointEvents;
