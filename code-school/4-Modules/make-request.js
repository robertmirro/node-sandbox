var http = require('http');

var makeRequest = function ( message ) {
    var options = {
        host: 'localhost',
        port: 8080,
        path: '/',
        method: 'POST'
    }

    var request = http.request(options, function ( response ) {
        response.on('data', function ( data ) {
            console.log(data.toString());
        });
    });

    console.log('data to POST:' , message );
    request.write(message);
    request.end();
}

// pass a quoted message from command line OR revert to passing a default messages
//  ex: node make-request.js "this is my command line param message"
makeRequest(process.argv[2] || 'This is the DEFAULT message that I\'m POSTing...');
