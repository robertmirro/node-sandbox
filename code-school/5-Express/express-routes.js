var express = require('express');
var app = express();

app.get('/tweets', function ( request, response ) {
    console.log('getting file...');
    response.sendfile(__dirname + '/tweets.html');
})

app.listen(8080);
console.log('Listening on 8080... \n__dirname: ' + __dirname);

