const express = require('express');

//app setup
var app = express();
var http = require('http').Server(app);

//static files
app.use(express.static('public'));

//socket setup
var io = require('socket.io')(http);

//initialize a new instance of socket.io by passing the http server object.
//then listen on the connection event for incoming sockets and log it to console.
io.on('connection', function(socket){
  console.log('a user connected', socket.id);

//prints out the chat message
  socket.on('chat', function(msg){
      io.sockets.emit('chat', msg);
  })

 //broadcast pushes from server to all users except sender
 //broadcast only works on backget
  socket.on('typing', function(msg){
      socket.broadcast.emit('typing', msg)
  });

//fire a disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


var PORT = process.env.PORT  || 8000;
http.listen(PORT, function(){
  console.log('listening on, ' + PORT);
});
