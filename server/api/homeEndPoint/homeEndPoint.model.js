'use strict';

import mongoose from 'mongoose';

var HomeEndPointSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('HomeEndPoint', HomeEndPointSchema);
