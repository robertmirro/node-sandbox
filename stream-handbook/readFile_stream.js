var http = require('http');
var fs = require('fs');

var server = http.createServer( function( request , response  ) {
    // pipe read stream output to response stream immediately when data is received
    var stream = fs.createReadStream( __dirname + '/data.txt' );
    stream.pipe( response );
}).listen( 8080 );

// to-test: $ curl http://localhost:8080