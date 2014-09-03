var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { };
    var operator = { '$unset' : { 'date_returned' : '' } };
    var options = { 'multi' : true };

    // update() all records (multi) that match query criteria, remove field via $unset if it exists
    // NOTE: it is reported that update() updates ALL documents (16) even though only 1 doc had a "date_returned" field
    // NOTE: ALL documents were not actually modified so (16) is misleading
    db.collection('grades').update(query, operator, options, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " documents!");

        return db.close();
    });
});
