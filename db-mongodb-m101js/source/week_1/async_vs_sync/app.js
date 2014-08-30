var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/node_demo', function(err, db) {

    if(err) throw err;

    // Find one document in our collection
    db.collection('contacts').findOne({}, function(err, doc) {

        if(err) throw err;

        // Print the result
        console.log(doc);

        // Close the DB
        db.close();
    });

    // Declare success
    console.log("Called findOne!");
});
