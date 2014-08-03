var http = require('http') ,
    mongojs = require('mongojs') ,
    url = require('url') ;

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

    var parsedUrl = url.parse( request.url , true );
//    console.log( parsedUrl );

    var dbQuery = parsedUrl.query.name ? { name : new RegExp( parsedUrl.query.name , 'i' ) } : {} ;

    db.contacts.find( dbQuery , function( err , records ) {
//        console.log( 'err:' , err );
//        console.log( 'records:' , records );

        if ( records && records.length > 0 ) {
//            console.log( records.length );
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