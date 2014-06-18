var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();

chat.on('message', function(chatMessage) {
    console.log('Message: ' + chatMessage);
});

chat.emit('message', 'Did this work?');

