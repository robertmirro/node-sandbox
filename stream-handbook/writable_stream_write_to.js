var outputFilename = 'writeStream.txt';

var fs = require('fs');
var writeStream = fs.createWriteStream( outputFilename );
var spawn = require('child_process').spawn;

// manually write to a writeable stream
writeStream.write( new Date() + '\n' );
writeStream.write( 'bob' );
writeStream.write( ' mirro ');

setTimeout( function(  ) {
    writeStream.end( 'is me' );

    console.log( '\n%s:' , outputFilename );
    var cat = spawn( 'cat' , [ outputFilename ]);
    cat.stdout.on( 'data' , function( data ) {
        process.stdout.write( data.toString() );
    });
    cat.on( 'close' , function( exitCode ) {
        process.stdout.write( '\n' );
    });

} , 1000 );

//$ node writable_stream_write_to.js
//
//writeStream.txt:
//Mon Jul 28 2014 17:12:39 GMT-0400 (Eastern Daylight Time)
//bob mirro is me
