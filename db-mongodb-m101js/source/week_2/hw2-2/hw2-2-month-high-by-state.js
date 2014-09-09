var mongodb = require('mongodb') ,
    MongoClient = mongodb.MongoClient ,
    ObjectID = mongodb.ObjectID;

MongoClient.connect( 'mongodb://localhost:27017/weather' , function( err , db ) {

    var sortBy = [ [ 'State' , 1 ] , [ 'Temperature' , -1 ] ];
    var currentState = '';

    db.collection( 'data' ).find().sort( sortBy ).each( function( err , doc ) {
        if ( err ) {
            console.log( 'error 1' );
            throw err;
        }
        if ( doc == null ) {
            // console.log( 'closing db 1...' );
            // return db.close();

            setTimeout( function() {
                console.log( 'closing db 2...' );    
                db.close();
            } , 0 );

            return;
        }

        if ( currentState !== doc.State ) {
            currentState = doc.State;
            // console.log( 'state: %s , temp: %s' , doc.State , doc.Temperature );

            // find data in shell: db.data.find( { month_high : true} ).pretty()
            // undo updates in shell: db.data.update( { month_high : true} , { $unset : { month_high : true } } , { multi : true } )

            var query = { _id: ObjectID( doc._id ) } ,
                operator = { $set : { month_high : true } } ,
                sort = [] ,
                options = { new : true };


            db.collection( 'data' ).findAndModify( query , sort , operator , options , function ( err , doc ) {
                if ( err ) {
                    console.log( 'error 3' );
                    throw err;
                }

                console.log( 'updated: %s : %s : %s' , doc.State, doc.Temperature , doc._id );
            });   

            // db.collection( 'data' ).update( query , operator , function( err , updated ) {
            //     if ( err ) {
            //         console.log( 'error 2' );
            //         throw err;
            //     }
            //     console.log( 'updated: %s : %s : %s' , doc.State, doc.Temperature , doc._id /* JSON.stringify( query ) */ );
            // });
        }
    });

    // db.collection( 'data' ).count( function( err , count ) {
    //     console.log( 'count:' , count );
    //     db.close();
    // });

});