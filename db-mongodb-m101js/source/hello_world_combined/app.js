var app = require('express')(),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID, // needed to query by _id
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('node_test');

app.get('/', function(req, res){

    // Find one document in our collection
    db.collection('users').findOne( {  "_id" : ObjectId("53f4d320cdd8fecc12643ec5")  } , function(err, doc) {
        // console.log(err);
        // console.log(doc);

        if(err) throw err;

        res.render('hello', doc);
    });
});

app.get('*', function(req, res){
    // depreciated
    // res.send('Page Not Found', 404);

    res.status( 404 ).send( 'Page Not Found' );
});

mongoclient.open(function(err, mongoclient) {

    if(err) throw err;

    app.listen( 8080 , function() {
        console.log( 'Express server started on port ' + this.address().port );    
    });

});
