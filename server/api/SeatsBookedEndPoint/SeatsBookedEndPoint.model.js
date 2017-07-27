'use strict';

import mongoose from 'mongoose';

var SeatsBookedEndPointSchema = new mongoose.Schema({
  Date: String,
  Email: String,
  MovieName: String,
  Phone: String,
  SeatIDs: Array,
  TheatreLocation: String,
  TheatreName: String,
  Time: String
});

export default mongoose.model('SeatsBookedEndPoint', SeatsBookedEndPointSchema);
