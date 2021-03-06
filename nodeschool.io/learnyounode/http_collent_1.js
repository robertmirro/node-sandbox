var http = require('http');

var urlToGet = process.argv[2];
//console.log('urlToGet:', urlToGet);

var responseData = '';

http.get(urlToGet, function( response ) {
    //console.log(response.statusCode);
    response.setEncoding('utf8');  // set encoding so toString() is not needed on dataChunk below

    response.on('data', function( dataChunk ) {
        //console.log('\n\ndataChunk:', dataChunk.toString());
        //console.log('\n\ndataChunk:', dataChunk);
        //console.log('data', dataChunk.length);
        responseData += dataChunk;
    });

    response.on('end', function() {
        console.log(responseData.length);
        console.log(responseData);
    })
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