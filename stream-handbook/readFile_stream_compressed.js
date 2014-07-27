var http = require('http');
var fs = require('fs');
var oppressor = require('oppressor');

var server = http.createServer( function( request , response  ) {
    // pipe read stream output to response stream immediately when data is received
    // oppressor returns a duplex stream with gzip'd content (or deflate or no compression) if supported by browser
    var stream = fs.createReadStream( __dirname + '/data.txt' );
    stream.pipe( oppressor( request ) ).pipe( response );
}).listen( 8080 );

// to-test: $ curl http://localhost:8080