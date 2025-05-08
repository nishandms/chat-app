const express = require('express');
const querys = require('../querys/messages');

module.exports = function(io) {
  const router = express.Router();

  io.on('connection', function(socket) {
    console.log('connected to socket');

    socket.on('join', function(room) {
      console.log('joined room:', room);
      socket.join(room);
    });

    socket.on('send', function(data) {
      if (data) {
        console.log(data);
        socket.to(data.toId).emit('message', data);
      }
    });
  });

  return router;
};