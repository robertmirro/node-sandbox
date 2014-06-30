var http = require('http');

(function() {
    "use strict";

    var urlToGet = [];

    function setUrlToGet(url) {
        urlToGet.push({
            index: urlToGet.length,
            url: url,
            urlData: '',
            ended: false
        });
    }

    setUrlToGet(process.argv[2]);
    setUrlToGet(process.argv[3]);
    setUrlToGet(process.argv[4]);

    urlToGet.forEach( function( element , index  ) {

        //console.log(index, element.index, element.url, element.ended);
        (function( element , index ) {

            //console.log(index, urlToGet[index].url);
            http.get(element.url, function( response ) {
                //console.log(response.statusCode);
                response.setEncoding('utf8');  // set encoding so toString() is not needed on dataChunk below

                response.on('data', function( dataChunk ) {
                    element.urlData += dataChunk;
                });

                response.on('end', function() {
                    //console.log('ended:', index);
                    element.ended = true;
                    var allEnded = urlToGet.every( function( element , index ) {
                        //console.log('every', index, element.ended);
                        return (element.ended === true);
                    });
                    if (allEnded) {
                        urlToGet.forEach( function( element , index ) {
                           console.log(element.urlData);
                        });
                    }
                    //console.log('allEnded:', index, allEnded);
                })
            }).on('error', function( error ) {
                return console.log('Error:', error.code);
            });

        })( element , index );
    });
})();

// OFFICIAL SOLUTION
//
//var http = require('http')
//var bl = require('bl')
//var results = []
//var count = 0
//
//function printResults () {
//    for (var i = 0; i < 3; i++)
//        console.log(results[i])
//}
//
//function httpGet (index) {
//    http.get(process.argv[2 + index], function (response) {
//        response.pipe(bl(function (err, data) {
//            if (err)
//                return console.error(err)
//
//            results[index] = data.toString()
//            count++
//
//            if (count == 3) // yay! we are the last one!
//                printResults()
//        }))
//    })
//}
//
//for (var i = 0; i < 3; i++)
//    httpGet(i)