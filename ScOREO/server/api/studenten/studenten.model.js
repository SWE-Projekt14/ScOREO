'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentenSchema = new Schema({
  vName: String,
  nName: String,
  GebDatum: String,
  stGeschl: String, 
  stKurs: String,    
  vorlesungen: [],
  info: String,
  active: Boolean,
    
// testblock
  title: { type: String },
  rating: String,
  releaseYear: Number,
  hasCreditCookie: Boolean
    
    
    
    
    
    
});

module.exports = mongoose.model('Studenten', StudentenSchema);



//test block

/*var thor = new Studenten({
  title: 'Thor'
, rating: 'PG-13'
, releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, hasCreditCookie: true
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});*/
