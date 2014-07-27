var Readable = require('stream').Readable;

// simple readable stream that pipes output to stdout
var readableStream = new Readable;
readableStream.push( 'one ');
readableStream.push( 'two\n');
readableStream.push( null );

readableStream.pipe( process.stdout );

//=> one two