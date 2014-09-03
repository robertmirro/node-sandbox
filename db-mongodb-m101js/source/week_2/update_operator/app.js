var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw1' };
    var operator = { '$set' : { 'date_returned' : new Date() } };

    // update() in-place (only update specific field(s) via $set)
    // NOTE: $set will create the field if it doesn't exist, otherwise it will update it
    // NOTE: dont need to findOne() as we did in previous example because we dont need to write entire record via update()
    db.collection('grades').update(query, operator, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " document!");

        return db.close();
    });
});
