'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DozentSchema = new Schema({
  vName: String,
  nName: String,
  GebDatum: String,
  stGeschl: String, 
  stKurs: String,    
  vorlesungen: [],
  //email: String,  
  info: String,
  active: Boolean,
});

module.exports = mongoose.model('Dozent', DozentSchema);