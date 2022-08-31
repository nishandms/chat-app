var express = require('express');
var router = express.Router();
const querys = require('../querys/messages');
const io = require('socket.io')(4000).sockets;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});



io.on('connection', function (socket) {
  console.log("socket connected")
  socket.on('send', function (data) {
    if(data) {
      querys.addMessage(data, (data)=>{
        console.log(data);
        getAllMessage();
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
