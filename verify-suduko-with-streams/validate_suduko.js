//
// http://howtonode.org/coding-challenges-with-streams
//
// test : node validate_suduko.js < input_data.txt
//
var stream = require('stream');
var split = require('split');

function transformStreamProblem() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( dataLine , encoding , nextCb ) {
        console.log( 'Problem:' , dataLine.match( /\d+/g ) );

        if ( !this.totalPuzzlesToSolve ) {
            this.totalPuzzlesToSolve = +dataLine;
        }
        else if ( !this.puzzleSize ) {
            this.puzzleSize = +dataLine * +dataLine;
            this.puzzle2dArray = [];
        }
        else {
            ts.push( dataLine + ' (P)' /* + '\n' */ );
        }

        nextCb();
    };
    ts.totalPuzzlesToSolve = null;
    ts.puzzleSize = null;
    ts.puzzle2dArray = null;
    return ts;
}

function transformStreamSolution() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( dataChunk , encoding , nextCb ) {
        console.log( 'Solution:' , dataChunk );
        ts.push( dataChunk + ' (S)' /* + '\n' */ );
        nextCb();
    };
    return ts;
}

function transformStreamFormat() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( dataChunk , encoding , nextCb ) {
//        console.log( 'Format:' , dataChunk );
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

// split() stdin data into lines and then transform each line one by one
process.stdin
    .pipe( split() )
    .pipe( tsProblem )
    .pipe( tsSolution )
    .pipe( tsFormat )
    .pipe( process.stdout );
