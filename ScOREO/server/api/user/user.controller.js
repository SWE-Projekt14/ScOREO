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

exports.InitVorlesung = function (req, res, next) {
  console.log("InitVorlesung");
  User.update({
    _id: req.body._id
  }, {
    vorlesung: {restsdf:{}}
  }, function (err, raw) {
    if (err) return handleError(err);
  });
};

exports.AddVorlesung = function (req, res, next) {
  console.log(req.body);
  User.update({
    _id: req.body._id
  }, {
    vorlesung: {
      req: {
        Testate: {
          blupp: {
            Score: 4
          },
          blaa: {
            Score: 2
          }
        },
        Dozent: "test"
      },
      Mathe: {
        Testate: {
          bludgfhpp: {
            Score: 4
          },
          blfgaa: {
            Score: 2
          }
        },
        Dozent: "tessdft"
      }
    }
  }, function (err, raw) {
    if (err) return handleError(err);
  });
  User.update({
    stKurs: req.body.kurs
  }, {
    $pushAll: {
      vorlesung: [req.body.name]
    }
  }, {
    multi: true
  }, function (err, raw) {
    if (err) return handleError(err);
  });
};

exports.AddTestat = function (req, res, next) {
  var lokUserTestat;
  User.findById(req.body._id, function (err, user) {
    console.log(user);
    lokUserTestat = user.vorlesung;
  });
  console.log(lokUserTestat);

  User.find({
    stKurs: req.body.kurs
  }, function (err, users) {
    if (err) return res.send(500, err);
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