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
//        console.log( 'Problem:' , dataLine.match(  ) );

        if ( !this.totalPuzzlesToSolve ) {
            // store total puzzles in case we want to validate input data
            this.totalPuzzlesToSolve = +dataLine;
        }
        else if ( !this.puzzleSize ) {
            // collect data for a new puzzle
            this.puzzleSize = +dataLine * +dataLine;
            this.puzzleData2dArray = [];
        }
        else {
            // populate 2d array with this line of puzzle data (an array of numbers)
            this.puzzleData2dArray.push( dataLine.match( /\d+/g ) );
            this.puzzleSize--;

            // if all lines of this puzzle data have been processed
            if ( this.puzzleSize === 0) {
                // pipe puzzle data to next transform stream and prepare to process next set of puzzle data
                ts.push( this.puzzleData2dArray );
                this.puzzleSize = null;
            }
        }

        nextCb();
    };
    ts.totalPuzzlesToSolve = null;
    ts.puzzleSize = null;
    ts.puzzleData2dArray = null;
    return ts;
}

function transformStreamSolution() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( dataChunk , encoding , nextCb ) {
//        console.log( 'Solution:' , dataChunk );
        ts.push( dataChunk /* + ' (S)' */ /* + '\n' */ );
        nextCb();
    };
    return ts;
}

function transformStreamFormat() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( dataChunk , encoding , nextCb ) {
//        console.log( 'Format:' , dataChunk );
        ts.push( dataChunk  /* + ' (F)' */ + '\n' );
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
