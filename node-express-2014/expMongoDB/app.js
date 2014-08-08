/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
    mongoose.connect('mongodb://guest:guest@ds053439.mongolab.com:53439/node_demo');
}

// load all files in models directory
fs.readdirSync( __dirname + '/models').forEach( function( filename ) {
//    console.log( 'filename: ' , filename );
    if (~filename.indexOf( '.js' )) {
        require( __dirname + '/models/' + filename );
    }
});
// /:contactId
// find users by contactId (contacts.index)
//   ex: localhost/users/4
app.get('/users/:contactId', function(req, res) {
//    console.log( 'params:' , req.params.contactId );
    mongoose.model( 'contacts' ).find( { index: parseInt(req.params.contactId) } , function( err , contacts ) {
//        res.writeHead( 200, {  } );
        res.set( 'Content-Type' , 'application/json; charset=utf-8' );  // pretty-print
        res.send( JSON.stringify( contacts , null , ' ' ) /*contacts*/ );
    });
//    res.send( 'ok: ' + new Date() );
});

app.get('/repos', function(req, res) {
    mongoose.model( 'github_repos' ).find( function( err , repos ) {
        res.set( 'Content-Type' , 'application/json; charset=utf-8' ); // pretty-print
        res.send( JSON.stringify( repos , null , ' ' ) /*repos*/ );
    });
});


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
