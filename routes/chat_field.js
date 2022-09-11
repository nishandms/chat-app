var express = require('express');
var router = express.Router();
const querys = require('../querys/messages');
const io = require('socket.io')(4000).sockets;



io.on('connection', function (socket) {
  console.log("socket connected")
  socket.on('send', function (data) {
    if(data) {
      querys.addMessage(data.fromId,data).then(res=> {
        console.log(res);
      });
      querys.addMessage(data.toId,data).then(res=> {
        console.log(res);
      })
    }
  });

  function status(result) {
    socket.emit('status',{connected: true})
  }

  function getAllMessage() {
    querys.getAllMessages().then(data => {
      socket.emit('recieve',data)
    })
  }
});



module.exports = router;
