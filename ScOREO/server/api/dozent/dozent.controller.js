'use strict';

var _ = require('lodash');
var Dozent = require('./dozent.model');

// Get list of dozents
exports.index = function(req, res) {
  Dozent.find(function (err, dozents) {
    if(err) { return handleError(res, err); }
    return res.json(200, dozents);
  });
};

// Get a single dozent
exports.show = function(req, res) {
  Dozent.findById(req.params.id, function (err, dozent) {
    if(err) { return handleError(res, err); }
    if(!dozent) { return res.send(404); }
    return res.json(dozent);
  });
};

// Creates a new dozent in the DB.
exports.create = function(req, res) {
  Dozent.create(req.body, function(err, dozent) {
    if(err) { return handleError(res, err); }
    return res.json(201, dozent);
  });
};

// Updates an existing dozent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Dozent.findById(req.params.id, function (err, dozent) {
    if (err) { return handleError(res, err); }
    if(!dozent) { return res.send(404); }
    var updated = _.merge(dozent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, dozent);
    });
  });
};

// Deletes a dozent from the DB.
exports.destroy = function(req, res) {
  Dozent.findById(req.params.id, function (err, dozent) {
    if(err) { return handleError(res, err); }
    if(!dozent) { return res.send(404); }
    dozent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}