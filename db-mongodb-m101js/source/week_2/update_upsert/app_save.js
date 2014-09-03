var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'student' : 'Bob' , 'assignment' : 'hw1' };

    db.collection('grades').findOne( query , function( err , doc ) {
        console.log( doc );        
        if ( doc == null ) {
            // doc = { 'createdOn' : new Date() };
            doc = query;
            doc.createdOn = new Date();
        }
        doc.updatedOn = new Date();

        // save() inserts doc if it doesn't exist (if save() cannot find the document using doc._id)
        // otherwise save() overwrites entire document (replace) similar to using update() without $set
        db.collection('grades').save( doc , function( err , saved ) {
            if(err) throw err;

            // the saved param contains the doc object (document) when doc is inserted, otherwise saved is of type number indication how many docs were saved    
            console.log("Successfully saved " + ( typeof saved === 'number' ? saved : '' ) + " documents!");

            return db.close();
        });
    });
});
