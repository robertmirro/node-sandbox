var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw1' };

    db.collection('grades').findOne(query, function(err, doc) {
        if(err) throw err;
        if(!doc) {
            console.log('No documents for assignment ' + query.assignment + ' found!');
            return db.close();
        }

        query['_id'] = doc['_id'];
        doc['date_returned'] = new Date();

        // update() via replacement (re-writing entire record) with entire previous record + newly created date_returned field
        // number of documents updated is passed to the callback as "updated" param
        db.collection('grades').update(query, doc, function(err, updated) {
            if(err) throw err;

            console.dir("Successfully updated " + updated + " document!");

            return db.close();
        });
    });
});
