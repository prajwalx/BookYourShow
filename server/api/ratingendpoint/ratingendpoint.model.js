'use strict';

import mongoose from 'mongoose';

var RatingendpointSchema = new mongoose.Schema({
  Movie: String,
  Rating: String

});

export default mongoose.model('Ratingendpoint', RatingendpointSchema);
