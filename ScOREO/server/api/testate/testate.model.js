'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestateSchema = new Schema({
  name: String,
  kriteriums: [],
  isChoosen: Boolean,
  H2s: [],
  impacts: [],
  Score: Boolean,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Testate', TestateSchema);