//make connection

//socket.io-client which exposes io global and then connects.
//no URL is specified when calling io() since it defaults to trying to connect to the host that serves the page
var socket = io()


//query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


//emit events (emit pushes to server )
//when user types message server recieves it as 'chat' message
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value, //.value = value attribute of input element
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', function(msg){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + msg.handle + ': </strong>' + msg.message + '</p>';
});

socket.on('typing', function(msg){
    feedback.innerHTML = '<p><em>' + msg + ' is typing...</em></p>'
});
