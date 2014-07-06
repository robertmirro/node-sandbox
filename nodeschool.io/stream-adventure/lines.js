var through = require('through');
var split = require('split');

var lineNum = 0;
var tr = through(function (line) {
    line = line.toString();
    this.queue( ( lineNum++ % 2 === 0 ? line.toLowerCase() : line.toUpperCase() ) + '\n' );
});
process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);


//// this is my solution and it works but use official solution above because it makes better use of pipe() and through()
//var lineNum = 0;
//process.stdin
//    .pipe(split())
//    .pipe( through( function writeLine( line ) {
//        // convert even numbered lines to UPPERCASE and odd numbered lines to LOWERCASE, consider first line to be odd
//        line = (++lineNum % 2 === 0) ? line = line.toUpperCase() : line = line.toLowerCase();
//        process.stdout.write(line.toString() + '\n');
//    }));


//var lineNum = 0;
//process.stdin.pipe(split()).on( 'data' , function( line ) {
//    // only convert even numbered lines to UPPERCASE, consider first line to be odd
//    if (++lineNum % 2 === 0) {
//        line = line.toUpperCase();
//    }
//
//    //process.stdout.write(line.toString());
//    //console.log( ++lineNum + ' ' + line);
//    console.log( line );
//});


//// print out a line for each line in input data
//var i = 0;
//process.stdin.pipe(split()).on( 'data' , function( line ) {
//    console.log(++i , line);
//});


// CAN TEST AS FOLLOWS:
//1
//$ echo -e 'Bob\nMirro\nIs\nMe' | node lines.js
//bob
//MIRRO
//is
//ME
// --OR--
//2
//node lines.js
//[type characters and press <enter> after each line]
//Bob
//bob
//Mirro
//MIRRO
//Is
//is
//Me
//ME

// OFFICIAL SOLUTION
//
//var through = require('through');
//var split = require('split');
//
//var lineCount = 0;
//var tr = through(function (buf) {
//    var line = buf.toString();
//    this.queue(lineCount % 2 === 0
//            ? line.toLowerCase() + '\n'
//            : line.toUpperCase() + '\n'
//    );
//    lineCount ++;
//});
//process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);