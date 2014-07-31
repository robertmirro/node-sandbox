// http://tagtree.tv/intro-to-node-streams
// words.txt - https://raw.githubusercontent.com/eneko/data-repository/master/data/words.txt

"use strict";

var fs = require('fs');
var stream = require('stream');

// if maxWords is not passed, read stream will continue indefinitely
function randomWordStream( maxWords ) {
    var rs = stream.Readable();
    var wordContents = fs.readFileSync( './words.txt' , 'utf8' );
//    console.log( '%s bytes' , wordContents.length );
    var words = wordContents.split( '\n' );
//    console.log( '%s words' , words.length );
    var currentWord = 0;

    rs._read = function( size ) {
        if ( currentWord >= maxWords ) {
            // null terminator to inform consumer that data is done being output
            return rs.push( null );
        }

        currentWord++;

        setTimeout( function() {
            var randomIndex = Math.floor( Math.random() * words.length ) ;
            rs.push( currentWord + '. ' + words[ randomIndex ] /* + '\n' */ );
        }, 100 );
    };

    // return an instance of our stream
    return rs;
}

function writeWordStream() {
    var ws = stream.Writable();
    ws._write = function( dataChunk , encoding , nextCb ) {
        console.log( dataChunk.toString() );

        // inform producer we are ready for next dataChunk
        // nextCb();
        setTimeout( nextCb , 500 );
    };
    return ws;
}

// pass maxWords as a command line arg
var rws = randomWordStream( process.argv[2] );
var wws = writeWordStream();
rws.pipe( wws );

