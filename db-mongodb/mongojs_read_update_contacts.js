var http = require('http') ,
    mongojs = require('mongojs') ,
    url = require('url') ;

var dbUrl = 'mongodb://guest:guest@ds053439.mongolab.com:53439/node_demo' ,
//    dbUrl = 'mongodb://localhost:27017/node_demo' ,
    db =  mongojs.connect( dbUrl , [ 'contacts' , 'github_repos' ] ) ,
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

    var dbQuery = parsedUrl.query.age ? { age : { $gte : parseInt( parsedUrl.query.age ) } } : {} ;

    // sort by descending age
    db.contacts.find( dbQuery ).sort( { age : 1 } , function( err , records ) {
        if ( err || !records || records.length < 1 ) {
            response.writeHead( 200, { 'Content-Type' : 'text/plain' } );
            return response.end( 'No data found.' );
        }

        response.writeHead( 200, { 'Content-Type' : 'text/html' } );
        response.write( '<html><head><title></title></head><body>' );
        records.forEach( function( contact ) {
//            response.write( JSON.stringify( contact , null , ' ' ) + '<br /><br />' );
            response.write( '<p>' + contact.name + ' &lt;' + contact.email + '&gt; (<b>' + contact.age + '</b>) </p>' );

//            // .save() ONLY saved the _id and name fields and seemed to lose all other fields in record
//            db.contacts.save( { _id : contact._id , name : contact.name + ' (' + contact.index + ')' } );

//            // .update() worked as desired and updated .name field
//            // .update() also seems to have re-written entire record because record keys are now stored alphabetically
//            db.contacts.update( { _id : contact._id } , { $set: { name : contact.name + ' (' + contact.index + ')' } } );
        });
        response.end( '</body></html>' );
    });
});

httpServer.on( 'close' , function() {

});

httpServer.listen( httpServerPort , function(  ) {
    console.log( 'HTTP Server listening on port' , httpServer.address().port );
});