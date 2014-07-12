var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server');

var listenOnPort = process.argv[2] || 8080;

var cache = {};

var server = http.createServer( function( request , response ) {
    var filePath = ( request.url === '/' ? 'public/index.html' : 'public' + request.url );
    var absoluteFilePath = './' + filePath;
    serveStaticFile( response , cache , absoluteFilePath );
});

// invoke listen() to start the HTTP server
server.listen( listenOnPort , function() {
    console.log( 'Server listening on port', server.address().port );
});

chatServer.listen( server );


function send404 ( response ) {
    "use strict";
    response.writeHead( 404 , {'Content-Type': 'text/plain'} );
    response.end( 'Error 404: Resource not found.' );
}

function sendFile ( response , filePath , fileContents ) {
    "use strict";
    response.writeHead( 200 , {'Content-Type': mime.lookup( path.basename( filePath ))} );
    response.end( fileContents );
}

function serveStaticFile ( response , cache , absoluteFilePath ) {
    "use strict";
    // serve file from cache if possible
    if ( cache[ absoluteFilePath ] ) {
        return sendFile( response , absoluteFilePath , cache[ absoluteFilePath ] );
    }

    fs.readFile( absoluteFilePath , function( error , fileContents ) {
        if ( error ) {
            return send404( response );
        }

        // cache file then serve file
        cache[ absoluteFilePath ] = fileContents;
        sendFile( response , absoluteFilePath , fileContents );
    });
}

