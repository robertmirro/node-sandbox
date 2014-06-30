var http = require('http');
var fs = require('fs');

var listenOnPort = process.argv[2];
var fileToServe = process.argv[3];

var server = http.createServer( function( request , response ) {
    //console.log('Connected to server...', getDateTime());
    response.writeHead(200, {'Content-Type': 'text/plain'});

    var fileToRead = fs.createReadStream(fileToServe);
    fileToRead.pipe(response);
});
server.listen(listenOnPort);

console.log('Server listening on port', server.address().port );

// OFFICIAL SOLUTION
//
//var http = require('http')
//var fs = require('fs')
//
//var server = http.createServer(function (req, res) {
//    res.writeHead(200, { 'content-type': 'text/plain' })
//
//    fs.createReadStream(process.argv[3]).pipe(res)
//})
//
//server.listen(Number(process.argv[2]))