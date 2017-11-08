//make connection

var socket = io()


//query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


//emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
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
