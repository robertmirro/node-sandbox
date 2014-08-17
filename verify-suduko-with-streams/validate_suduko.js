//
// http://howtonode.org/coding-challenges-with-streams
//
// test : node validate_suduko.js < input_data.txt
//
var stream = require('stream');
var split = require('split');

function transformStreamProblem() {
    var ts = stream.Transform();
    ts._transform = function( dataChunk , encoding , nextCb ) {
        ts.push( dataChunk + ' (P)' /* + '\n' */ );
        nextCb();
    };
    return ts;
}

function transformStreamSolution() {
    var ts = stream.Transform();
    ts._transform = function( dataChunk , encoding , nextCb ) {
        ts.push( dataChunk + ' (S)' /* + '\n' */ );
        nextCb();
    };
    return ts;
}

function transformStreamFormat() {
    var ts = stream.Transform();
    ts._transform = function( dataChunk , encoding , nextCb ) {
        ts.push( dataChunk + ' (F)' + '\n' );
        nextCb();
    };
    return ts;
}

var tsProblem = transformStreamProblem();
var tsSolution = transformStreamSolution();
var tsFormat = transformStreamFormat();

// set encoding so .toString() is not needed when transforming stream data chunks
process.stdin.setEncoding( 'utf8' );

process.stdin
    .pipe( split() )
    .pipe( tsProblem )
    .pipe( tsSolution )
    .pipe( tsFormat )
    .pipe( process.stdout );
