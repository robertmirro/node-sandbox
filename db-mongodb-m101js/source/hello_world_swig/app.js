var app = require('express')(),
    cons = require('consolidate'); // Templating library adapter for Express

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('hello', { name : 'World (from swig)' });
});

app.get('*', function(req, res){
    // depreciated
    // res.send('Page Not Found', 404);

    res.status( 404 ).send( 'Page Not Found' );
});

app.listen( 8080 , function() {
    console.log( 'Express server started on port ' + this.address().port );    
});
