var Writable = require('stream').Writable;

var writeableStream = Writable();

// specify internal _write function to respond each time
//   producer is ready to write data (on demand)
writeableStream._write = function( data , encoding , cb ) {
    console.log( '\ndata: %s' , data.toString() );
    console.dir ( data );
    console.log('');
    cb();  // invoke callback when done processing data
};

process.stdin.pipe( writeableStream );

//$ (echo bob; sleep 1; echo mirro; sleep 1; echo is me) | node writable_stream.js
//
//data: bob
//
//<Buffer 62 6f 62 0a>
//
//
//data: mirro
//
//<Buffer 6d 69 72 72 6f 0a>
//
//
//data: is me
//
//<Buffer 69 73 20 6d 65 0a>