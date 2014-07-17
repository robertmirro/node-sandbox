var square = require('./square');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on( 'calc-square', function( value ) {
    console.log( 'The square value of (%s) is (%s)' , value , square( value ) );
});

emitter.emit( 'calc-square' , 4 );