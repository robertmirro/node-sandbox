var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // var query = { 'title' : { '$regex' : 'Microsoft' } };
    // var query = { 'title' : { $regex : 'reddit' , $options : 'i' } };

    // from shell: db.reddit.find({title:{$regex:'nsa',$options:'i'}},{title:1}).pretty()
    var query = { 'title' : { $regex : 'nsa' , $options : 'i' } };

    var projection = { 'title' : 1, '_id' : 0 };

    db.collection('reddit').find(query, projection).each(function(err, doc) {
        if(err) throw err;

        if(doc == null) {
            return db.close();
        }

        console.log( 'title: %s \n' , doc.title );

    });
});
