var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // update() assigns the query object to the newly upserted document
    // $set is used so only fields specified via $set are upserted (on insert) or updated (on update) and origin query object fields are preserved in upserted document
    var query = { 'student' : 'Robert' , 'assignment' : 'hw1' };
    var updateDoc = { $set : { 'grade' : 100 , 'updatedOn' : new Date() } , $setOnInsert : { 'createdOn' : new Date() } };
    var options = { 'upsert' : true };

    db.collection('grades').update( query , updateDoc , options , function(err, updated) {
        if(err) throw err;

        console.log("Successfully upserted " + updated + " documents!");

        return db.close();
    });
});
