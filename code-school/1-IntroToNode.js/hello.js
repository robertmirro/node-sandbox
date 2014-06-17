
var http = require('http');

http.createServer( function ( request , response ) {
    response.writeHead(200);
    response.write('Hello, this is dog.');
    response.end();
}).listen(8080);
console.log('listening on port 8080...');

// test: curl http://localhost:8080

// node registers "request" event above (there are other events like "connection", "close", etc)
// node starts event look and continuously checks for events (requests in this example)
// as events arrive, the event loop adds them to the event queue and processes them one at a time.

// Ryan Dahl - JS's model of concurrency is completely based on events since there is no concept of threads.




