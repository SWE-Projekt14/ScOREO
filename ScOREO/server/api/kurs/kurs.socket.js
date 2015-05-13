/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Kurs = require('./kurs.model');

exports.register = function(socket) {
  Kurs.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Kurs.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('kurs:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('kurs:remove', doc);
}