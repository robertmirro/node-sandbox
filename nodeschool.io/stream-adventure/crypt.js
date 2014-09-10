var cryptoDecipherStream = require('crypto').createDecipher( 'aes256' , process.argv[2] );

process.stdin.pipe( cryptoDecipherStream ).pipe( process.stdout );

// OFFICIAL SOLUTION
//
// var crypto = require('crypto');
// process.stdin
//     .pipe(crypto.createDecipher('aes256', process.argv[2]))
//     .pipe(process.stdout)
// ;