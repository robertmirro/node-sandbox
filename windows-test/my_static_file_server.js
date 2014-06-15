var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/'));

console.log('__dirname: ', __dirname);

app.listen(8080);

// test: http://127.0.0.1:8080/my_image.jpg