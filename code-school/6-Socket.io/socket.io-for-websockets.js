var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function ( client ) {
    console.log('Client connected...');
})