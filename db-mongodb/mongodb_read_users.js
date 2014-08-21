var MongoClient = require('mongodb').MongoClient;

MongoClient.connect( 'mongodb://localhost:27017/node_test' , function( err , db ) {
    if ( err ) {
        throw err;
    }

    console.log( 'Connected to %s...' , db.databaseName /*Object.keys( db )*/ );
//    console.log( Object.keys( db ) );
//    console.log( db.collectionNames('users') );

    var collection = db.collection( 'users' );
//    console.log( Object.keys( collection ) );


    collection.find( {} , { username: 1 , email : 1 , _id : 0} ).toArray( function( err , documents ) {
        collection.count( function( err , count ) {
            console.log( 'Total %s documents: %s' , collection.collectionName , count );
            db.close();
        });

        console.log( documents );
//        db.close();
    });

    console.log( 'Finding %s documents...' , collection.collectionName );
});