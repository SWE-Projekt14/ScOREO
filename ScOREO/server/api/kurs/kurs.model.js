'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KursSchema = new Schema({
  name: String,
  jahrgang: Number,
  studenten: [],
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Kurs', KursSchema);