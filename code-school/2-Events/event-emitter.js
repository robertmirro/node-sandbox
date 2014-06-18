var EventEmitter = require('events' ).EventEmitter;

var logger = new EventEmitter();

logger.on('myError', function ( message ) {
    console.log('ERROR: ' + message);
})

// emit our custom event
logger.emit('myError', 'Milk is now spilled!');