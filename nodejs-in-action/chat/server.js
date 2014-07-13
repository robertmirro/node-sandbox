var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server');

// enable "server" debugging via: $ DEBUG=server node server.js
// enable debugging for all types via: $ DEBUG=* node server.js
// enable when namespacing is used: $ DEBUG=server:http node server.js
// enable multiple namespaces: $ DEBUG=server:http,server:sendFile node server.js
// enable all namespaces: $ DEBUG=server:* node server.js
// enable all debugging but EXCLUDE all from a namespace: $ DEBUG=*,-server:* node server.js
var debugHttp = require('debug')('server:http');
var debugSendFile = require('debug')('server:sendFile');

var listenOnPort = process.argv[2] || 8080;

var cache = {};

var server = http.createServer( function( request , response ) {
    var filePath = ( request.url === '/' ? 'public/index.html' : 'public' + request.url );
    var absoluteFilePath = './' + filePath;
    debugHttp( 'filePath requested: %s' , filePath );
    serveStaticFile( response , cache , absoluteFilePath );
});

// invoke listen() to start the HTTP server
server.listen( listenOnPort , function() {
    // console.log( 'Server listening on port', server.address().port );
    debugHttp( 'Server listening on port: %s', server.address().port );
});

chatServer.listen( server );

function send404 ( response ) {
    "use strict";
    response.writeHead( 404 , {'Content-Type': 'text/plain'} );
    response.end( 'Error 404: Resource not found.' );
}

function sendFile ( response , filePath , fileContents ) {
    "use strict";
    debugSendFile( 'filePath: %s' , filePath );
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
