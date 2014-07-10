var request = require('request');

//// GET
//request('http://localhost:8000/').pipe(process.stdout);

// POST
//request.post('http://localhost:8000/').pipe(process.stdout);

process.stdin.pipe(request.post('http://localhost:8000/')).pipe(process.stdout);

// OFFICIAL SOLUTION
//
//var request = require('request');
//var r = request.post('http://localhost:8000');
//process.stdin.pipe(r).pipe(process.stdout);