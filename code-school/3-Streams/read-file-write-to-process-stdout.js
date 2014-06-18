var fs = require('fs');

var fileToRead = fs.createReadStream('index.html');

// console.log calls process.stdout.write
fileToRead.pipe(process.stdout);