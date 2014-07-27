var Readable = require('stream').Readable;

// simple readable stream that pipes output to stdout
var readableStream = new Readable;

// pushing data to read stream before piping it to stdout below
// this results in data chunks being buffered until consumer of
//   the read stream is ready to read them
readableStream.push( 'one ');
readableStream.push( 'two\n');

// null terminator to inform consumer that data is done being output
readableStream.push( null );

readableStream.pipe( process.stdout );

//=> one two