var http = require('http');
var mongojs = require('mongojs');

var dbUrl = 'mongodb://guest:guest@ds053439.mongolab.com:53439/node_demo' ,
    db =  mongojs.connect( dbUrl , [ 'contacts' ] ) ,
    httpServer = http.createServer() ,
    httpServerPort = ( process.argv[2] || 8080 ) ;

httpServer.on( 'request' , function( request , response ) {
    console.log( 'Request received:' , new Date() );
//    console.log( 'URL:' , request.url );

    if ( request.url.toLowerCase().indexOf( 'favicon' ) >= 0  ) {
//        console.log( 'Ignore favicon requests...' );
        response.writeHead( 404 );
        response.end();
    }

    db.contacts.find( {} , function( err , records ) {
//        console.log( 'err:' , err );
//        console.log( 'records:' , records );

        if ( (records) ) {
            response.writeHead( 200, { 'Content-Type' : 'application/json; charset=utf-8' } );
            return response.end( JSON.stringify( records , null , ' ' ) );  // pretty-print the JSON
        }
        response.writeHead( 200, { 'Content-Type' : 'text/plain' } );
        response.end( 'No data found.' );
    });
});

httpServer.on( 'close' , function() {

});

httpServer.listen( httpServerPort , function(  ) {
    console.log( 'HTTP Server listening on port' , httpServer.address().port );
});