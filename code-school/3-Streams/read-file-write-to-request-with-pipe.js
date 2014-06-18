var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'image/png'});

    var fileToRead = fs.createReadStream('icon.png');

    fileToRead.pipe(response);

    //fileToRead.pipe(response, { end: false});

    //fileToRead.on('end', function () {
    //    response.end();
    //})
} ).listen(8080);

