'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestateSchema = new Schema({
  name: String,
  kriterien: [],
  isChoosen: Boolean,
  H2: Boolean,
  impacts: [],
  Score: Boolean,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Testate', TestateSchema);