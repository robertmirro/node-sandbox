var Readable = require('stream').Readable;

// simple readable stream that pipes output to stdout
var readableStream = new Readable;

var charCode = 97;

// specify internal _read function to respond each time consumer is ready to read data
// ignore "size" param used to specify how many bytes consumer wants to read
readableStream._read = function( size ) {
    readableStream.push( String.fromCharCode( charCode++ ) );
    if ( charCode > 'z'.charCodeAt(0) ) {
        // null terminator to inform consumer that data is done being output
        readableStream.push( null );
    }
};

readableStream.pipe( process.stdout );

//=> abcdefghijklmnopqrstuvwxyz