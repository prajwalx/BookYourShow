'use strict';

import mongoose from 'mongoose';

var TheatresendpointSchema = new mongoose.Schema({
  TheatreName: String,
  State: String,
  City: String,
  Locations:String
});

export default mongoose.model('Theatresendpoint', TheatresendpointSchema);
