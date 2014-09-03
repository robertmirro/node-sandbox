var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    // counter name is "comments"
    // increment the counter's counter (create field if it doesn't exist)
    // instruct findAndModify() to return newly updated document, NOT the pre-updated version of the document
    // use upsert to initially create comments counter document
    //   NOTE: if upsert is NOT used, need to insert a doc to avoid "no counter found..." message below
    //   from shell: db.counters.insert({name:'comments'})
    var query = { 'name' : 'comments' };
    var sort = [];
    var operator = { '$inc' : { 'counter' : 1 } };
    var options = { 'new' : true , 'upsert' : true };

    // atomically increment a counter AND get the value while being certain that rgw value returned is the value that existed immediately after our increment
    // NOTE: using update() and find() seperately does not guarantee the counter value is the value we incremented it to
    db.collection('counters').findAndModify(query, sort, operator, options, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
        }
        else {
            console.log("Number of comments: " + doc.counter);
        }

        return db.close();
    });
});
