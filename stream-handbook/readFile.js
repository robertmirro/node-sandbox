var http = require('http');
var fs = require('fs');

var server = http.createServer( function( request , response  ) {
    // read entire file contents first then output it to response stream all at once
    fs.readFile( __dirname + '/data.txt' , function( err , data ) {
        response.end( data );
    });
}).listen( 8080 );

// to-test: $ curl http://localhost:8080