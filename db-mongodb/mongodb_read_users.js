var MongoClient = require('mongodb').MongoClient;

MongoClient.connect( 'mongodb://localhost:27017/node_test' , function( err , db ) {
    if ( err ) {
        throw err;
    }

    console.log( 'Connected to %s...' , db.databaseName /*Object.keys( db )*/ );
//    console.log( Object.keys( db ) );
//    console.log( db.collectionNames('users') );

    db.collection( 'users' ).find( {} , { username: 1 , email : 1 , _id : 0} ).toArray( function( err , documents ) {
        console.log( documents );
        db.close();
    });

    console.log( 'Finding users...' );
});