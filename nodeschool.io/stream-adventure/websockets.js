var websocket = require('websocket-stream');

var stream = websocket( 'ws://localhost:' + (process.argv[2] || 8080) );

stream.on( 'data' , function( data ) {
    console.log( 'data recieved from server: %s' , data );
    stream.end();
})
stream.write( 'write: ' + new Date() );

//stream.end( 'hello\n' );

// OFFICIAL SOLUTION
//
//var ws = require('websocket-stream');
//var stream = ws('ws://localhost:8000');
//stream.end('hello\n');
