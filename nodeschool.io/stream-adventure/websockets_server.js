var http = require('http');
var websocket = require('websocket-stream');
var WebSocketServer = require('ws').Server;

var listenOnPort = process.argv[2] || 8080;

var httpServer = http.createServer();
httpServer.listen( listenOnPort , function() {
    console.log( 'Server listening on port: %s', httpServer.address().port );
});

// piggy back websocket server on http server
var wsServer = new WebSocketServer( { server: httpServer} );
wsServer.on( 'connection' , function( ws ) {
    console.log( 'websocket server connection...' );

    // open websocket stream on websocket connection
    var wsStream = websocket( ws );
    wsStream.on( 'data' , function( data ) {
        console.log( 'data received: %s' , data );
    });

//    // can also listen for 'message' event directly on websocket connection
//    // this is an alternate to stream method above that produces same effect
//    ws.on( 'message' , function( message ) {
//        console.log( 'message received: %s' , message );
//    });
});
