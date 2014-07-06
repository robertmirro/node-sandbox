var concatStream = require('concat-stream');

process.stdin
    .pipe( concatStream( function( inputString ) {
        var reversedString = inputString.toString().split('' ).reverse().join('');
        console.log( reversedString );
    }));


// CAN TEST AS FOLLOWS:
//1
//$ echo -e 'bob mirro is me' | node concat.js
//
//em si orrim bob


// OFFICIAL SOLUTION
//
//var concat = require('concat-stream');
//
//process.stdin.pipe(concat(function (src) {
//    var s = src.toString().split('').reverse().join('');
//    console.log(s);
//}));