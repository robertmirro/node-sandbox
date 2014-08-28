var app = require('express')()
  , cons = require('consolidate'); // Templating library adapter for Express

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// removed in 4.x: https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x
// app.use(app.router);

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.render('error_template', { error: err });
}

app.use(errorHandler);

// curl "http://localhost:8080/roberto?getvar1=El&getvar2=Bobbio"
app.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var getvar1 = req.query.getvar1 || 'not specified' ;
    var getvar2 = req.query.getvar2 || 'ugh' ;
    res.render('hello', { name : name, getvar1 : getvar1, getvar2 : getvar2 });
});

app.listen( 8080 , function() {
    console.log( 'Express server started on port ' + this.address().port );    
});
