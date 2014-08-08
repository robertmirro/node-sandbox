var express = require('express'),
    app = express();

// tell express to server files from the /public directory
// but make it appear as though they are being servered from
// the root directory (see "test" below)
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/'));

console.log('__dirname: ', __dirname);

app.listen(8080);

// test: http://127.0.0.1:8080/my_image.jpg