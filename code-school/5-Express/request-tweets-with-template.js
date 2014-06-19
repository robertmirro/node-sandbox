var express = require('express');
var request = require('request');
var url = require('url');

var app = express();

// setup a root route that responds to get request
// __dirname = current directory
app.get('/tweets/:username', function ( req, response ) {
    var username = req.params.username;
    console.log('getting tweets for ' + username + '...');

    // twitter v1.1 api is considerably more difficult to use so use jsontest.com for now to return json
    var options = {
        protocol: 'http:',
        host: 'date.jsontest.com',
        pathname: '',
        query: {
            screen_name: username,
            count: 10
        }
    }

    var twitterUrl = url.format(options);
    console.log('twitterUrl: ' + twitterUrl)

    request(twitterUrl, function ( err, res, body ) {
        var tweets = JSON.parse(body);
        console.log('tweets JSON: ', tweets);
        response.render('./tweets.ejs', {tweets: tweets, name: username});
    });
})

app.listen(8080);
console.log('Listening on 8080... \n__dirname: ' + __dirname);

// test: curl http://127.0.0.1:8080/tweets/:addyosmani
//
// {"errors":[{"message":"The Twitter REST API v1 is no longer active. Please migrate to API v1.1. https://dev.twitter.com/docs/api/1.1/overview.","code":64}]}
//

