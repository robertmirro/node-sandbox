var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var grades = db.collection('grades');

    // regardless of the order of the method calls below, 
    // the order in which they are applied internally is:
    // 1 - sort()
    // 2 - skip()
    // 3 - limit()
    var cursor = grades.find( {} );
    cursor.skip(1);
    cursor.limit(4);
    cursor.sort('grade', 1);
    
    // order of sort options in the array dictates sort order (ex: first sort by grade, then by student)
    //cursor.sort([['grade', 1], ['student', -1]]);

    // an alternative to the above is to provide an options object to find():
    // var options = { 
    //     'skip' : 1,
    //     'limit' : 4,
    //     'sort' : [['grade', 1], ['student', -1]] 
    // };
    // var cursor = grades.find( {} , {} , options );


    // from shell: db.grades.find().skip(1).limit(4).sort( { grade : 1 } ).forEach( function(doc) { printjson(doc) } )
    // from shell: db.grades.find().skip(1).limit(4).sort( { grade : 1 , student : -1 } ).forEach( function(doc) { printjson(doc) } )
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        console.dir(doc);
    });
});
