var http = require('http');
var concatStream = require('concat-stream');

var urlToGet = process.argv[2];
//console.log('urlToGet:', urlToGet);

var responseData = '';

http.get(urlToGet, function( response ) {
    //console.log(response.statusCode);
    //response.setEncoding('utf8');  // set encoding so toString() is not needed on dataChunk below, this does NOT work with bl() below

    response.pipe(concatStream( function( responseData ) {
        responseData = responseData.toString();
        console.log(responseData.length);
        console.log(responseData);
    }));
}).on('error', function( error ) {
    return console.log('Error:', error.code);
});


// OFFICIAL SOLUTION
//
//var http = require('http')
//var bl = require('bl')
//
//http.get(process.argv[2], function (response) {
//    response.pipe(bl(function (err, data) {
//        if (err)
//            return console.error(err)
//        data = data.toString()
//        console.log(data.length)
//        console.log(data)
//    }))
//})