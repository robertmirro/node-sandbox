
var http = require('http');

// event #1 - request
http.createServer( function ( request , response ) {
    response.writeHead(200);
    response.write('Dog is running...');

    // simulate a long running process (pause for 5 seconds)
    // event #2 - timeout
    setTimeout( function () {
        response.write('Dog is done.');
        response.end();
    }, 5000)
}).listen(8080);
console.log('listening on port 8080...');

// there are 2 events in this code.
// each time a request event comes in, it also creates a timeout event.

// NOTE: setTimeout is non-blocking.
// All of the node libraries are also non-blocking.

// test: curl http://localhost:8080




