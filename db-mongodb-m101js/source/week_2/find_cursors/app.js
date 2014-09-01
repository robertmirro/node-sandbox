var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : {$gte : 90} };

    // return cursor instead of invoking a callback 
    // NOTE: this results in SYNCHRONOUS processing so cursor.each logic can work below because JS waits for curser to be returned
    var cursor = db.collection('grades').find(query);

    // console.log( Object.keys( cursor ) );
    console.log( cursor.collectionName );

    // manually iterate cursor, invoke call back for each document returned
    cursor.each(function(err, doc) {
        if(err) throw err;

        // cursor is exhausted, there is no more data, we can close connection to DB now
        if(doc == null) {
            return db.close();
        }

        console.log(doc.student + " got a %s grade! (%s)", ( doc.grade === 100 ? 'GREAT' : 'good' ) , doc.grade );
    });
});
