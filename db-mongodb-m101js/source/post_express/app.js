var app = require('express')()
  , cons = require('consolidate')
  , bodyParser = require('body-parser');  // manually require this middleware for express 4.x

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// removed in 4.x: https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x
// app.use(express.bodyParser());
// app.use(app.router);

// middleware for express 4.x...
//
// http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4/24330353#24330353
// use extended option below to get rid of this message when starting app:
//    "body-parser deprecated undefined extended: provide extended option app.js:13:20"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true} ));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.use(errorHandler);

// from browser:   http://localhost:8080
// from curl:  $ curl http://localhost:8080
app.get('/', function(req, res, next) {
    res.render('fruitPicker', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

// from curl (json):  $ curl -X POST -d '{ "fruit" : "blue berry" }' -H "Content-Type: application/json"  http://localhost:8080/favorite_fruit
// from curl (x-www-form-urlencoded):  $ curl -X POST -d "fruit=blue%20berries" http://localhost:8080/favorite_fruit
app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next(Error('Please choose a fruit!'));
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

app.listen( 8080 , function() {
    console.log( 'Express server started on port ' + this.address().port );    
});
