var fs = require('fs');

var fileToRead = fs.createReadStream('icon.png');
var fileToWrite = fs.createWriteStream('icon-written.png');

fileToRead.on('data', function ( chunk ) {
    var bufferWasWritting = fileToWrite.write(chunk);
    if (!bufferWasWritting) {
        fileToRead.pause();
    }
})

fileToWrite.on('drain', function () {
    fileToRead.resume();
})

fileToRead.on('end', function () {
    fileToWrite.end();
})