'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
  Poster: String,
  Title: String,
  Actors: String,
  Duration: String,
  Genre: String,
  Directors: String,
  Id:String
});

export default mongoose.model('Movies', MoviesendpointSchema);
