var fs = require('fs');

var fileToRead = process.argv[2];

fs.createReadStream(fileToRead).pipe(process.stdout);

// OFFICIAL SOLUTION
//
//var fs = require('fs');
//var file = process.argv[2];
//fs.createReadStream(file).pipe(process.stdout);