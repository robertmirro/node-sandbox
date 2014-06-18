var fs = require('fs');

var fileToRead = fs.createReadStream('index.html');

// console.log calls process.stdout.write
// override default end() being called by pipe
fileToRead.pipe(process.stdout, { end: false});

// manually handle end of stream event
fileToRead.on('end', function () {
    console.log('--File Complete--');
})