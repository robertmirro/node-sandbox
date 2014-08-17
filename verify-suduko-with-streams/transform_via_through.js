//
// test : node transform_via_through.js < input_data.txt | less
//
var through = require('through');
var stream = require('stream');

var tr = through( function writeData( data ) {
        console.log( '\n\nthrough:\n' , data.toString() );

        // immediately emit data to stream
        //this.emit( 'data' , data.toString().toUpperCase() );

        // queue all data then flush all data to stream at once
        this.queue( data.toString() /* .toUpperCase() */ );
    },
    function endData () {
        console.log('\n\n through ending...\n');

//        this.emit( 'end' );
        this.queue( null );
    });

function writeStream() {
    var ws = stream.Writable();
    ws._write = function( dataChunk , encoding , nextCb ) {
        console.log( '\n\nwrite:\n' , dataChunk.toString() );

        // simulate a delay and illustrate async processing
        // inform producer we are ready for next dataChunk
        // nextCb();
        setTimeout( nextCb , 1000 );
    };
    return ws;
}

var ws = writeStream();

// take data entered from stdin, pipe it to the "through" stream to be processed and then pipe it to write stream
process.stdin.pipe( tr ).pipe( ws /* process.stdout */ );

