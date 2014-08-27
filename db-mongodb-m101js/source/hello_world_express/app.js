var app = require('express')();

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('*', function(req, res){
    // depreciated
    // res.send('Page Not Found', 404);

    res.status( 404 ).send( 'Page Not Found' );
});

app.listen( 8080 , function() {
    console.log( 'Express server started on port ' + this.address().port );    
});


