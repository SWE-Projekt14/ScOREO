/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Testate = require('./testate.model');

exports.register = function(socket) {
  Testate.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Testate.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('testate:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('testate:remove', doc);
}