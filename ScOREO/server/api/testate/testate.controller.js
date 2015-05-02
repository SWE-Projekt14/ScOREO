'use strict';

var _ = require('lodash');
var Testate = require('./testate.model');

// Get list of testates
exports.index = function(req, res) {
  Testate.find(function (err, testates) {
    if(err) { return handleError(res, err); }
    return res.json(200, testates);
  });
};

// Get a single testate
exports.show = function(req, res) {
  Testate.findById(req.params.id, function (err, testate) {
    if(err) { return handleError(res, err); }
    if(!testate) { return res.send(404); }
    return res.json(testate);
  });
};

// Creates a new testate in the DB.
exports.create = function(req, res) {
  Testate.create(req.body, function(err, testate) {
    if(err) { return handleError(res, err); }
    return res.json(201, testate);
  });
};

// Updates an existing testate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Testate.findById(req.params.id, function (err, testate) {
    if (err) { return handleError(res, err); }
    if(!testate) { return res.send(404); }
    var updated = _.merge(testate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, testate);
    });
  });
};

// Deletes a testate from the DB.
exports.destroy = function(req, res) {
  Testate.findById(req.params.id, function (err, testate) {
    if(err) { return handleError(res, err); }
    if(!testate) { return res.send(404); }
    testate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}