var express = require('express'),
    app = express();

app.get('/', function(req, res) {
  res.send('hello world!!!');
});

//app.listen(3000);

var server = app.listen(3000, function() {
//app.listen(3000, function() {
    console.log('Listening on port %d... CTRL+C to end process', server.address().port);
});
