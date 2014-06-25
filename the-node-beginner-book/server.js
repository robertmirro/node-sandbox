
// require http and url modules that ship with Node
var http = require('http');
var url = require('url');

function start(route, handle) {
    "use strict";

    // createServer returns an HTTP server object
    // that object has a "listen" method that takes a numeric "port number" value that the object will listen on
    http.createServer( function( request , response ) {
        // this can result in 2 messages to log file because browser attempts to load favicon.ico
        //console.log('\nRequest received...', ++requestNum, request.method, request.httpVersion, request.headers.host + request.url);

        var pathname = url.parse(request.url).pathname;
        console.log('\nPathname requested: ' + pathname + '\n');

        route(handle, pathname, response, request);
    }).listen(8080);

    console.log('Server started.');
}

exports.start = start;

// the code above to start an http server and listen on a port could also be written as:
//
//var server = http.createServer();
//server.on('request', function(request, response) {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.write('Hello World!');
//    response.end();
//});
//server.listen(8080);
//
// --OR--
//
//function onRequest( request, response  ) {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.write('Hello World!');
//    response.end();
//}
//var server = http.createServer(onRequest);
//server.listen(8080);
//
// --OR--
//
//http.createServer(onRequest).listen(8080);
//


//http://nodejs.org/api/http.html#http_http_createserver_requestlistener
//
//http.createServer([requestListener])#
//Returns a new web server object.
//
//    The requestListener is a function which is automatically added to the 'request' event.
//