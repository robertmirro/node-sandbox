var http = require('http');
var through = require('through');

var listenOnPort = process.argv[2];

// full definition of through( callback )
//var tr = through( function writeData( data ) {
//        this.queue( data.toString().toUpperCase() );
//    },
//    function endData() {
//        this.queue( null );
//    });

// there is a stream-adventure bug related to this so DO NOT USE "through" in this manner
// https://github.com/nodeschool/discussions/issues/351
//var tr = through( function writeData( data ) {
//    this.queue( data.toString().toUpperCase() );
//});

var server = http.createServer( function( request , response ) {
//    response.writeHead( 200 );
//    console.log(request.method);
    if ( request.method.toUpperCase() !== 'POST' ) {
        return response.end('Only POSTed data is accepted...\n');
    }

//    var requestReceived = 'Request received on ' + new Date();
//    console.log( requestReceived );
//    response.write( requestReceived + '\n' );

//    // there is a stream-adventure bug related to this so DO NOT USE "through" in this manner
//    // https://github.com/nodeschool/discussions/issues/351
//    request.pipe( tr ).pipe( response );

    request.pipe(  through( function writeData( data ) {
        this.queue( data.toString().toUpperCase() );
    })).pipe( response );

//    response.end();
});
server.listen(listenOnPort);


// OFFICIAL SOLUTION
//
//var http = require('http');
//var through = require('through');
//
//var server = http.createServer(function (req, res) {
//    if (req.method === 'POST') {
//        req.pipe(through(function (buf) {
//            this.queue(buf.toString().toUpperCase());
//        })).pipe(res);
//    }
//    else res.end('send me a POST\n');
//});
//server.listen(parseInt(process.argv[2]));

