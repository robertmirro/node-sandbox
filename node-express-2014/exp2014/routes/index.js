var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // access querystring params
    // test: http://localhost:3000/?title=NoTitle&name=Roberto
    // result: querystring: { title: 'NoTitle', name: 'Roberto' }
    console.log( 'querystring:' , req.query );

    // res.send( 'ok' );  // returns content-type text/html and displays "ok"
    // res.send( 200 );  // returns content-type text/plain and HTTP status 200
    // res.send({
    //     users : [ 'Robert' , 'Bob' , 'Bobbio' ]  // returns content-type application/json and JSON object
    // });
    res.render('index', { title: 'Express' , name: 'El Bobbio' });  // render Hogan template (views/index.hjs)
});

router.get('/users/:id', function(req, res) {
    // access querystring params
    // test: http://localhost:3000/users/48
    // result: params: { id: '48' }
    console.log( 'params:' , req.params );

    res.send( 'id:' + req.params.id , 200 );  // returns content-type text/plain and HTTP status 200, display id:48 in browser
});

module.exports = router;
