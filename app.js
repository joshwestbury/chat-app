const express = require('express');

//app setup
var app = express();
var http = require('http').Server(app);

//static files
app.use(express.static('public'));

//socket setup
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected', socket.id);

  socket.on('chat', function(msg){
      io.sockets.emit('chat', msg);
  })

  socket.on('typing', function(msg){
      socket.broadcast.emit('typing', msg)
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
