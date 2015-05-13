'use strict';

var _ = require('lodash');
var Kurs = require('./kurs.model');

// Get list of kurss
exports.index = function(req, res) {
  Kurs.find(function (err, kurss) {
    if(err) { return handleError(res, err); }
    return res.json(200, kurss);
  });
};

// Get a single kurs
exports.show = function(req, res) {
  Kurs.findById(req.params.id, function (err, kurs) {
    if(err) { return handleError(res, err); }
    if(!kurs) { return res.send(404); }
    return res.json(kurs);
  });
};

// Creates a new kurs in the DB.
exports.create = function(req, res) {
  Kurs.create(req.body, function(err, kurs) {
    if(err) { return handleError(res, err); }
    return res.json(201, kurs);
  });
};

// Updates an existing kurs in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Kurs.findById(req.params.id, function (err, kurs) {
    if (err) { return handleError(res, err); }
    if(!kurs) { return res.send(404); }
    var updated = _.merge(kurs, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, kurs);
    });
  });
};

// Deletes a kurs from the DB.
exports.destroy = function(req, res) {
  Kurs.findById(req.params.id, function (err, kurs) {
    if(err) { return handleError(res, err); }
    if(!kurs) { return res.send(404); }
    kurs.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}