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

        // simulate a delay and illustrate async processing
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

        // simulate a delay and illustrate async processing
        // inform producer we are ready for next dataChunk
        // nextCb();
        setTimeout( nextCb , 100 );
    };
    return ws;
}

// act as BOTH a read AND write stream
function transformWordStream() {
    var ts = stream.Transform();
    ts._transform = function( dataChunk , encoding , nextCb ) {
//        console.log( 'chunk: %s\n' , dataChunk.toString() + '(' + ')' );
        // transform pass-thru data to UPPERCASE and push it out to write stream
        // display original word text in parens (split word from index + word)
        var wordString = dataChunk.toString().trim();
        ts.push( wordString.toUpperCase() + ' (' + wordString.split(' ')[1] + ')' );

        // simulate a delay and illustrate async processing
        // inform producer we are ready for next dataChunk
        // nextCb();
        setTimeout( nextCb , 100 );
    };
    return ts;
}

// pass maxWords as a command line arg
var rws = randomWordStream( process.argv[2] );
var wws = writeWordStream();
var tws = transformWordStream();
rws.pipe( tws ).pipe( wws );

// test - display 10 words:
// $ node readable_writable_transform_stream_random_word.js 10
//
// test - display words infinitely -
// $ node readable_writable_transform_stream_random_word.js
