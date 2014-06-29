var http = require('http');

var urlToGet = process.argv[2];
//console.log('urlToGet:', urlToGet);

http.get(urlToGet, function( response ) {
    //console.log(response.statusCode);
    response.setEncoding('utf8');  // set encoding so toString() is not needed on dataChunk below

    response.on('data', function( dataChunk ) {
        //console.log('\n\ndataChunk:', dataChunk.toString());
        //console.log('\n\ndataChunk:', dataChunk);
        console.log(dataChunk);
    });
}).on('error', function( error ) {
    return console.log('Error:', error.code);
});

// This was my first attempt below, it works fine but I tried an alternate method above as well that also works
//
//var httpGet = http.get(urlToGet, function( response ) {
//    //console.log(response.statusCode);
//    response.setEncoding('utf8');  // set encoding so toString() is not needed on dataChunk below
//
//    response.on('data', function( dataChunk ) {
//        //console.log('\n\ndataChunk:', dataChunk.toString());
//        //console.log('\n\ndataChunk:', dataChunk);
//        console.log(dataChunk);
//    });
//});
//
//httpGet.on('error', function( error ) {
//    return console.log('Error:', error.code);
//});

// NOTE: the official solution below does not work with regards to error handling, error can't be trapped on response stream

// OFFICIAL SOLUTION
//
//var http = require('http')
//
//http.get(process.argv[2], function (response) {
//    response.setEncoding('utf8')
//    response.on('data', console.log)
//    response.on('error', console.error)
//})