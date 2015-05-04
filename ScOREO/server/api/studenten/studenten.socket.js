/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Studenten = require('./studenten.model');

exports.register = function(socket) {
  Studenten.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Studenten.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('studenten:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('studenten:remove', doc);
}