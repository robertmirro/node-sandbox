//var http = require('http');
//
//var myRequest = function(message) {
//    var request = http.request('http://codeschool.com', function(response) {
//        response.pipe(process.stdout, { end: false });
//    });
//
//    request.write(message);
//    request.end();
//};

console.log('here');
var myRequest = function () {
//    console.log('hola');
    return 'hola';
};

// NOTE: need to use module.exports here, NOT just "exports"
module.exports = myRequest;
