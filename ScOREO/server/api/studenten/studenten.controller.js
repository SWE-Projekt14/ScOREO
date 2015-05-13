'use strict';

var _ = require('lodash');
var Studenten = require('./studenten.model');

// Get list of studentens
exports.index = function(req, res) {
  Studenten.find(function (err, studentens) {
    if(err) { return handleError(res, err); }
    return res.json(200, studentens);
  });
};

// Get a single studenten
exports.show = function(req, res) {
  Studenten.findById(req.params.id, function (err, studenten) {
    if(err) { return handleError(res, err); }
    if(!studenten) { return res.send(404); }
    return res.json(studenten);
  });
};

// Creates a new studenten in the DB.
exports.create = function(req, res) {
  Studenten.create(req.body, function(err, studenten) {
    console.log(studenten);
    if(err) { return handleError(res, err); }
    return res.json(201, studenten);
  });
};

// Updates an existing studenten in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Studenten.findById(req.params.id, function (err, studenten) {
    if (err) { return handleError(res, err); }
    if(!studenten) { return res.send(404); }
    var updated = _.merge(studenten, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, studenten);
    });
  });
};

// Deletes a studenten from the DB.
exports.destroy = function(req, res) {
  Studenten.findById(req.params.id, function (err, studenten) {
    if(err) { return handleError(res, err); }
    if(!studenten) { return res.send(404); }
    studenten.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}