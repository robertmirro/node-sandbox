var express = require('express');
var app = express();

// setup a root route that responds to get request
// __dirname = current directory
app.get('/', function ( request, response ) {
    console.log('getting file...');
    response.sendfile(__dirname + '/index.html');
})

app.listen(8080);
console.log('Listening on 8080... \n__dirname: ' + __dirname);

// test: curl http://localhost:8080/
//   or: curl --head http://localhost:8080/