var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'grade' : 100 };

    // convert cursor to array of docs then invoke the call back
    db.collection('grades').find(query).toArray(function(err, docs) {
        if(err) throw err;

        // console.dir(docs);
        console.log( JSON.stringify( docs , null, '\t' ) );

        db.close();
    });
});
