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

module.exports = router;
