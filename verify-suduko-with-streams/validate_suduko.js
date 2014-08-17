//
// http://howtonode.org/coding-challenges-with-streams
//
// test : node validate_suduko.js < input_data.txt
//
var stream = require('stream');
var split = require('split');

function transformStreamProblem() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( inputLine , encoding , nextCb ) {
//        console.log( 'Problem:' , inputLine.match(  ) );

        if ( !this.totalPuzzlesToSolve ) {
            // store total puzzles in case we want to validate input data
            this.totalPuzzlesToSolve = +inputLine;
        }
        else if ( !this.puzzleSize ) {
            // collect data for a new puzzle
            this.puzzleSize = +inputLine * +inputLine;
            this.puzzleData2dArray = [];
        }
        else {
            // populate 2d array with this line of puzzle data (an array of numbers)
            this.puzzleData2dArray.push( inputLine.match( /\d+/g ) );
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
    ts._transform = function( puzzle2DArray , encoding , nextCb ) {
//        console.log( 'Solution:' , puzzle2DArray.length );

        ts.push( puzzleIsSolved( puzzle2DArray ) );
        nextCb();
    };
    return ts;
}

function puzzleIsSolved( puzzle2dArray ) {
    var puzzleSize = puzzle2dArray.length;

    var correctSolution = 0;
    for ( var i = 1; i <= puzzleSize; i++ ) {
        correctSolution += i;
//         console.log( 'i:%s = %s' , i , correctSolution );
    }

//    console.log( 'puzzleSize:%s , correctSolution:%s' , puzzleSize , correctSolution );

    // solved horizontally
    for ( var i = 0; i < puzzleSize; i++ ) {
//         console.log( 'i:%s ' , i , puzzle2dArray[ i ] );
        var puzzleSolution = puzzle2dArray[ i ].reduce( function( previousValue , currentValue , index , array ) {
//            console.log( 'typeof previousValue:%s' , typeof previousValue );
            return +previousValue + +currentValue;
        });
//        console.log( 'horizontal %s:%s' , i , puzzleSolution );
        if ( puzzleSolution !== correctSolution ) {
            return false;
        }
    }

    // solved vertically
    for ( var column = 0; column < puzzleSize; column++ ) {
        var puzzleSolution = 0;
        for ( var row = 0; row < puzzleSize; row++ ) {
//             console.log( 'puzzle2dArray[row][column]:' , puzzle2dArray[row][column] );
            puzzleSolution += +puzzle2dArray[row][column];
        }
//        console.log( 'vertical %s:%s' , column , puzzleSolution );
        if ( puzzleSolution !== correctSolution ) {
            return false;
        }
    }

//    return Math.round( Math.random() );
    return true;
}

function transformStreamFormat() {
    var ts = stream.Transform( { objectMode : true } );
    ts._transform = function( puzzleIsSolved , encoding , nextCb ) {
//        console.log( 'Format:' , puzzleIsSolved , typeof puzzleIsSolved );
        this.puzzleNumber++;
        ts.push( 'Puzzle# ' + this.puzzleNumber + ': ' + ( puzzleIsSolved ? 'Yes' : 'No' )  + '\n' );
        nextCb();
    };
    ts.puzzleNumber = 0;
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
