var request = require('request');
var url = require('url');

var options = {
    protocol: 'http:',
    host: 'www.google.com',
    pathname: '',
    query: {}
}

var googleUrl = url.format(options);
console.log('googleUrl: ' + googleUrl)

request(googleUrl, function ( error, response, body ) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});


