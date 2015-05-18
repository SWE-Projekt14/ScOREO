/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dozent = require('./dozent.model');

exports.register = function(socket) {
  Dozent.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dozent.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dozent:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dozent:remove', doc);
}