'use strict';

var User = require('./user.model');
var passport = require('passport');
var mongoose = require('mongoose');
var test = require('./user.controller.js')
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function (res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

exports.getDozenten = function (req, res) {
  User.find({
    role: 'dozent'
  }, function (err, users) {
    if (err) return res.send(500, err);
    else {
      res.json(200, users);
    }
  });
};

exports.AddVorlesung = function (req, res, next) {
  var pfad = 'vorlesung.' + req.body.name;
  var update = {};
  update[pfad] = {
    'Bezeichnung': req.body.name,
    'Kurs': req.body.kurs,
    'Testate': []
  };

  console.log(update);
  User.update({
    _id: req.body._id
  }, {
    $set: update
  }, function (err, raw) {
    if (err) return handleError(err);
  });
  User.update({
    stKurs: req.body.kurs
  }, {
    $set: update
  }, {
    multi: true
  }, function (err, raw) {
    if (err) return handleError(err);
  });
};

exports.bewKurs = function (req, res, next) {

};

exports.AddTestat = function (req, res, next) {
  var pfad = 'vorlesung.' + req.body.vorlesung + '.Testate';
  var update = {};
  update[pfad] = {
    'Titel': req.body.titel,
    'Kriterien': req.body.testate,
    'Score': '',
    'Gesamtwertung': ''
  };

  User.update({
    _id: req.body._id
  }, {
    '$addToSet': update
  }, {
    multi: true
  }, function (err, raw) {
    if (err) return handleError(500, err);
  });

  User.update({
      stKurs: req.body.kurs
    }, {
      '$addToSet': update
    }, {
      multi: true
    },
    function (err, users) {
      if (err) return res.send(500, err);
    });
};

exports.getTestatUser = function (req, res, next) {
  User.find({
    'role': 'student'
  }, function (err, users) {
    if (err) return res.send(500, err);
    else {
      res.json(200, users);
    }
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  // newUser.role = 'guest';
  newUser.save(function (err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({
      token: token
    });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

exports.calcS2R = function (req, res, next) {
  var path = '';
  var update = {};
  console.log(req.body);
  User.find({
    'stKurs': req.body.kurs
  }, function (err, users) {
    if (err) {
      return res.send(500, err);
    } else {
      users.forEach(function (value) {
        console.log(value);
        value.vorlesung[req.body.vorl].Testate.forEach(function (vvalue) {
          path = 'vorlesung.' + req.body.vorl + '.Testate';
          
          if (vvalue.Titel == req.body.testat) {
            console.log("oijkfsdvmpüef");
            vvalue.Kriterien.forEach(function (vvvalue) {
              path = path + '.' + vvalue.Kriterien;
              var refInvOp1, refInvOp2, refInvWert = 0;
              aktImpact = vvvalue.Impact;
              aktScore = vvvalue.Score;
              if (vvvalue.isH2) {
                aktBenchmark = 0.8;
              } else {
                aktBenchmark = 0.2;
              }
            });

            if (aktImpact === 0 || aktBenchmark === 0 || aktBenchmark === 1) {
              refInvWert = 1;
            }
            if (aktImpact !== 0 && aktBenchmark !== 0 && aktBenchmark !== 1 && aktScore < (aktBenchmark / (1 - aktImpact * (1 - aktBenchmark)))) {
              refInvOp1 = Math.log(1 - (aktScore / aktBenchmark) * (1 - aktImpact * (1 - aktBenchmark)));
              refInvOp2 = Math.log(aktImpact * (1 - aktBenchmark));
              refInvWert = refInvOp1 / refInvOp2;
            }

            if (aktImpact !== 0 && aktBenchmark !== 0 && aktBenchmark !== 1 && aktScore >= (aktBenchmark / (1 - aktImpact * (1 - aktBenchmark)))) {
              // Errorhandling!
            }

            update[path] = {
              'Score': aktScore,
              'Benchmark': aktBenchmark,
              'Impact': aktImpact,
              'Rate': refInvWert
            };
            console.log(update);
            User.update({
              _id: value._id
            }, {
              $: update
            }, function (err, raw) {
              if (err) return handleError(err);
            });

          }
        });
      });
    }
  });
};