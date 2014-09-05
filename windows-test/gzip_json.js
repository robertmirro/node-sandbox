var http = require('http');
var url = require('url');
var fs = require('fs');
var zlib = require('zlib');
var dateFormat = require('dateformat');
var vsprintf = require('sprintf').vsprintf;

var httpServer = http.createServer();

var httpServerRequests = 0;

httpServer.on( 'request' , function( request , response ) {
    if ( ~request.url.toLowerCase().indexOf( 'favicon' )  ) {
        // console.log( 'ignoring favico...' , request.url );
        response.writeHead( 404 , { 'Connection' : 'close' } );
        response.end();
        return;
    }

    httpServerLog( httpFormatLogMessage( 'request (%s) received' , [ ++httpServerRequests ] ) );

    var parsedUrl = url.parse( request.url , true );
    if ( parsedUrl.query.httpAction === 'close' ) {
        httpServer.close( function() {
            httpServerLog( 'http server closed' );
        });
        // process.exit();

        response.writeHead( 200 , { 'Connection' : 'close' } );
        response.end( 'http server has been terminated...' );
        return;
    }

    var jsonFile = fs.readFile( 'contacts.json' , function( err , file ) {
        zlib.gzip( file , function( err , gzipFile ) {
            response.writeHead( 200 , { 
                'Content-Type' : 'application/json; charset=utf-8' ,
                'Content-Encoding' : 'gzip' ,
                'Content-Length' : gzipFile.length
            });
            response.end( gzipFile );
        });
    });
});

httpServer.on( 'close' , function() {
    httpServerLog( 'close event received' );
});

httpServer.listen( process.argv[2] || 8080 , function() {
    httpServerLog( 'http server listening on port ' + httpServer.address().port );    
});

function httpFormatLogMessage( message , valuesArray ) {
    return vsprintf( message , valuesArray );
}

function httpServerLog ( message ) {
    console.log(
        '[' + dateFormat( new Date() , 'isoDateTime' ) + '] ' +
        message
    );
}
