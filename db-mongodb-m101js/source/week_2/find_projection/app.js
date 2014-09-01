var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    var projection = { 'student' : 1, '_id' : 0 };

    db.collection('grades').find(query, projection).toArray(function(err, docs) {
        if(err) throw err;

        docs.forEach(function ( doc , index ) {
            console.log( '\n%s:' , index , doc );
            console.log( '%s: %s got a good grade!', index , doc.student );
        });

        db.close();
    });
});
