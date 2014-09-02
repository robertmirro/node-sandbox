var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var docs = [ { 'student' : 'Robert', 'age' : 9 },
                 { 'student' : 'robert', 'age' : 10 } ];

    // being that JS is case sensitive, _id is case sensitive as well,
    // these 2 records are considered to have different _id values:                 
    // var docs = [ { _id : 'Mirro' , 'student' : 'Mirro', 'age' : 9 },
    //              { _id : 'mirro' , 'student' : 'mirro', 'age' : 10 } ];

    db.collection('students').insert(docs, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
});
