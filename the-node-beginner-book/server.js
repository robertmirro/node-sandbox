
// require http and url modules that ship with Node
var http = require('http');
var url = require('url');

function start(route, handle) {
    "use strict";

    var requestNum = 0;
    var dataChunks = 0;

    // createServer returns an HTTP server object
    // that object has a "listen" method that takes a numeric "port number" value that the object will listen on
    http.createServer( function( request , response ) {
        // this can result in 2 messages to log file because browser attempts to load favicon.ico
        //console.log('\nRequest received...', ++requestNum, request.method, request.httpVersion, request.headers.host + request.url);

        var pathname = url.parse(request.url).pathname;
        console.log('\nPathname requested: ' + pathname + '\n');

        // it is the http servers job to gather and data that has been submitted and pass it along to the app
        // assume data being gathered is encoded as utf-8
        var postData = '';
        request.setEncoding('utf8');

        // add listeners to gathering any data that has been submitted
        request.addListener('data', function( postDataChunk ) {
            dataChunks += 1;
            //console.log('\n\nRecieved postDataChunk:', postDataChunk)
            console.log('Recieved postDataChunk...', postDataChunk.length);
            postData += postDataChunk;
        })

        request.addListener('end', function() {
            // pass response object along to request handler, this server will no longer be responsible for outputting content to the client
            console.log('END DATA: total chunks of data received: ', dataChunks);
            route(handle, pathname, response, postData);
        })
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