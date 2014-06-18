var fs = require('fs');

var fileToRead = fs.createReadStream('index.html');

fileToRead.on('data', function ( chunk ) {
   console.log(chunk.toString());
});

fileToRead.on('end', function () {
})