var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var cache = {};

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

function serverStaticFile ( response , cache , absoluteFilePath ) {
    "use strict";
    // server file from cache if possible
    if ( cache[absoluteFilePath] ) {
        sendFile( response , absoluteFilePath , cache[absoluteFilePath] );
        return;
    }    
}