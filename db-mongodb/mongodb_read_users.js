var mongodb = require('mongodb');

mongodb.MongoClient.connect( 'mongodb://localhost:27017/node_test' , function( err , db ) {
    if ( err ) {
        throw err;
    }

    console.log( '\nConnected to %s...' , db.databaseName /*Object.keys( db )*/ );
//    console.log( Object.keys( db ) );
//    console.log( db.collectionNames('users') );

    var collection = db.collection( 'users' );
//    console.log( Object.keys( collection ) );

    // true = find one , false = find all
    var criteria = false ? { _id : new mongodb.ObjectID('53e7d8033584f6140cbe971a') } : {};

    collection.find( criteria  , { username: 1 , email : 1 , _id : 0} ).toArray( function( err , documents ) {
        collection.count( function( err , count ) {
            console.log( 'Total %s documents: %s' , collection.collectionName , count );
//            db.close();
        });

        if ( documents && documents.length > 0 ) {
            console.log( documents );
        }

        collection.findOne( {} , function( err , document ) {
            console.log( '\nFinding one %s document...' , collection.collectionName );
            if ( document ) {
                console.log( document );
                db.close();
            }
        });

//        db.close();
    });

    console.log( '\nFinding %s documents...' , collection.collectionName );
});