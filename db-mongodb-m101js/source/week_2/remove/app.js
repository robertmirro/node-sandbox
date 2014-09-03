var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query = { 'assignment' : 'hw3' };

    // re-add documents from shell after they are removed:
    //
    // db.grades.insert([
    // { "_id" : ObjectId("5403b07e9cfc71745992d2fb"), "student" : "Joe", "assignment": "hw3", "grade" : 85 },
    // { "_id" : ObjectId("5403b07e9cfc71745992d2ff"), "student" : "Steve", "assignment" : "hw3", "grade" : 100 },
    // { "_id" : ObjectId("5403b07e9cfc71745992d303"), "student" : "Amanda", "assignment" : "hw3", "grade" : 80 },
    // { "_id" : ObjectId("5403b07e9cfc71745992d307"), "student" : "Susan", "assignment" : "hw3", "grade" : 85 }
    // ])    
    db.collection('grades').remove(query, function(err, removed) {
        if(err) throw err;

        console.dir("Successfully removed " + removed + " documents!");

        return db.close();
    });
});
