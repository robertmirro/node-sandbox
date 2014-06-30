var http = require('http');
var map = require('through2-map');

var listenOnPort = process.argv[2];

var server = http.createServer( function( request , response ) {

    //console.log(request.method);
    if (request.method.toUpperCase() !== 'POST') {
        response.end('Only POSTed data is accepted...\n');
    }
    //console.log('Connected to server...', getDateTime());
    response.writeHead(200, {'Content-Type': 'text/plain'});

    //request.pipe(response);

    // no need to use response.end() when piping output to response stream
//    request.pipe(map( function( dataChunk ) {
//        return dataChunk.toString().toUpperCase();
//    })).pipe(response);

    // can also pass wantStrings option to automatically convert chunked data toString() behind the scenes
    request.pipe(map( {wantStrings: true} , function( dataChunk ) {
        return dataChunk.toUpperCase();  // no need to convert toString() before uppercase'ing POSTed data
    })).pipe(response);
});
server.listen(listenOnPort);

console.log('Server listening on port', server.address().port );

// OFFICIAL SOLUTION
//
//var http = require('http')
//var map = require('through2-map')
//
//var server = http.createServer(function (req, res) {
//    if (req.method != 'POST')
//        return res.end('send me a POST\n')
//
//    req.pipe(map(function (chunk) {
//        return chunk.toString().toUpperCase()
//    })).pipe(res)
//})
//
//server.listen(Number(process.argv[2]))