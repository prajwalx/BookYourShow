'use strict';

import mongoose from 'mongoose';

var MapmovieEndpointSchema = new mongoose.Schema({
  MovieTitle: Object,
  TheatreName: Object,
  City:String,
  MovieDates:Array,
  ShowTimings:Array

});

export default mongoose.model('MapmovieEndpoint', MapmovieEndpointSchema);
