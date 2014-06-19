var http = require('http');

var server = http.createServer();

var numRequests = 0;

server.on('request', function(request, response) {
    response.writeHead(200);
    response.write("Hello, this is dog on port " + server.address().port + "..." );
    response.end();
});

server.on('request', function(request) {
    console.log("New request coming in at " + new Date() + "...");

    // using CTRL+C to close server does not fire "close" event so manually invoke it here
    numRequests += 1;
    if (numRequests >= 3) {
        server.close();
    }
});

server.on('close', function() {
    console.log("Closing down the server at " + new Date() + "...");
});

server.listen(8080);

console.log('Server listening on port', server.address().port );

