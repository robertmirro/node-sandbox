var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // update() assigns the query object to the newly upserted document
    // however, $set is NOT used with update() so updateDoc object overwrites entire document that was upserted
    var query = { 'student' : 'Frank' , 'assignment' : 'hw1' };
    var updateDoc = { 'student' : 'Frank' , 'assignment' : 'hw1' , 'grade' : 100 , 'updatedOn' : new Date() };
    var options = { 'upsert' : true };

    db.collection('grades').update( query , updateDoc , options , function(err, updated) {
        if(err) throw err;

        console.log("Successfully upserted " + updated + " documents!");

        return db.close();
    });
});
