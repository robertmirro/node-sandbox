var trumpet = require('trumpet')();  // create a trumpet stream
var through = require('through');

var classStream = trumpet.select( '.loud' ).createStream();
classStream.pipe( through( function( data ) {
    this.queue( data.toString().toUpperCase() );
})).pipe( classStream );

process.stdin.pipe( trumpet ).pipe( process.stdout );


// OFFICIAL SOLUTION
//
//var trumpet = require('trumpet');
//var through = require('through');
//var tr = trumpet();
//
//var loud = tr.select('.loud').createStream();
//loud.pipe(through(function (buf) {
//    this.queue(buf.toString().toUpperCase());
//})).pipe(loud);
//
//process.stdin.pipe(tr).pipe(process.stdout);


