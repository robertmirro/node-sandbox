var mongodb = require('mongodb') ,
    MongoClient = mongodb.MongoClient ,
    ObjectID = mongodb.ObjectID;

MongoClient.connect( 'mongodb://localhost:27017/weather' , function( err , db ) {

    function closeDb() {
        console.log( 'closing db...' );    
        db.close();
    }

    function logError( errType , err ) {
        console.log( 'ERROR : %s : %s' , errType , err.message );
        closeDb();        
    }

    var sortBy = [ [ 'State' , 1 ] , [ 'Temperature' , -1 ] ] , 
        currentState = '' , 
        pendingOperations = 0 , 
        maxCloseAttempts = 10 ;

    db.collection( 'data' ).find().sort( sortBy ).each( function( err , doc ) {
        if ( err ) {
            logError( 'find()' , err );
            throw err;
        }
        if ( doc == null ) {
            var intervalID = setInterval( function() {
                if ( pendingOperations <= 0 || maxCloseAttempts <= 0) {
                    closeDb();
                    clearInterval( intervalID );
                } else {
                    console.log( 'waiting to close db, pending operations:' , pendingOperations );
                    maxCloseAttempts -= 1;
                }
            } , 0 );

            // setTimeout( function() {
            //     console.log( 'closing db 2...' );    
            //     db.close();
            // } , 0 );

            return;
        }

        if ( currentState !== doc.State ) {
            currentState = doc.State;
            pendingOperations += 1;
            // console.log( 'state: %s , temp: %s' , doc.State , doc.Temperature );

            // find data in shell: db.data.find( { month_high : true} ).pretty()
            // undo updates in shell: db.data.update( { month_high : true} , { $unset : { month_high : true } } , { multi : true } )

            // VALIDATE HOMEWORK:
            //
            // $ node validate.js
            // hw2-2 Validated successfully!
            // Your validation code is: WSRMOzQ4KTKhFEC6rUDn

            var query = { _id: ObjectID( doc._id ) } ,
                operator = { $set : { month_high : true } } ,
                sort = [] ,
                options = { new : true };


            db.collection( 'data' ).findAndModify( query , sort , operator , options , function ( err , doc ) {
                if ( err ) {
                    logError( 'findAndModify()' , err );
                    throw err;
                }

                console.log( 'updated: %s : %s : %s' , doc.State, doc.Temperature , doc._id );
                pendingOperations -= 1;
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