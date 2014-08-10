var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET "hello world" page. */
router.get('/holamundo', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET "users list" page. */
router.get('/users', function(req, res) {
//    var db = req.db;
    var collection = req.db.get( 'users' );
    collection.find( {} , {} , function ( err , documents ) {
        res.render('userlist', { userlist: documents });
    });
});

/* GET "add new user" page. */
router.get('/createuser', function(req, res) {
    res.render('createuser', { title: 'Add New User' });
});

/* POST to "add user" service */
router.post('/adduser', function(req, res) {
//    var db = req.db;
    var collection = req.db.get( 'users' );
    
    // get submitted form fields
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    console.log( 'userName:%s , userEmail:%s' , userName , userEmail );
    
    collection.insert(
        {
            username: userName ,
            email: userEmail
        } ,
        function (err, document) {
            console.log( 'ERROR:' , err );
//            res.send( 'Uh oh...' );
            res.location( 'users' );
            res.redirect( 'users' );
        }
    );
});

module.exports = router;
