var express = require('express');
var app = express();
var quotes = {
    'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
    'berners-lee': 'The Web does not just connect machines, it connects people',
    'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
    'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function ( req, response ) {
    var quoteName = req.params.name;
    console.log('getting quote for ' + quoteName + '...');

    response.write(quotes[quoteName] ? quotes[quoteName] : 'Quote not found.' );
    response.end();
})
app.listen(8080);
console.log('Listening on 8080... \n__dirname: ' + __dirname);

// test: curl http://127.0.0.1:8080/tweets/:addyosmani
//
// {"errors":[{"message":"The Twitter REST API v1 is no longer active. Please migrate to API v1.1. https://dev.twitter.com/docs/api/1.1/overview.","code":64}]}
//


