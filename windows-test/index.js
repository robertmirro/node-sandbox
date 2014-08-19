var app = require('express')();

app.get('/', function(req, res) {
  res.send('hello world!!!');
});

//app.listen(3000);

// capture server instance via var
//var server = app.listen(3000, function() {
//    console.log('Listening on port %d... CTRL+C to end server', server.address().port);
//});

// reference server instance via this
app.listen(3000, function() {
    console.log('Listening on port %d... CTRL+C to end this', this.address().port);
});

//
// to test:
//   1. start server: node .
//   2. send web request to server:  curl http://localhost:3000
//