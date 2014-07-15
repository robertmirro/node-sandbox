var http = require('http');
var websocket = require('websocket-stream');
var WebSocketServer = require('ws').Server;

var listenOnPort = process.argv[2];

var httpServer = http.createServer();
httpServer.listen(listenOnPort);

// piggy back websocket server on http server
var wsServer = new WebSocketServer( { server: httpServer} );
wsServer.on( 'connection' , function( ws ) {
    var wsStream = websocket( ws );
    console.log( 'wsServer connection' );
});
