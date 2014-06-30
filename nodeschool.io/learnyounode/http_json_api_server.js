var http = require('http');
var url = require('url');

var listenOnPort = process.argv[2];

var server = http.createServer( function( request , response ) {

    var dateOutput = '';

    if (request.method.toUpperCase() === 'GET') {
        var parsedUrl = url.parse( request.url , true );
        //console.log(parsedUrl);

        var pathName = parsedUrl.pathname;
        var isoValue = parsedUrl.query.iso;
        var dateFromIso = new Date(isoValue);
        //console.log('pathName:', pathName, ', isoValue:', isoValue);

        if (pathName.toLowerCase() === '/api/parsetime') {
            //console.log('JSON');
            response.writeHead(200, {'Content-Type': 'application/json'});
            dateOutput = JSON.stringify({
                hour: dateFromIso.getHours(),
                minute: dateFromIso.getMinutes(),
                second: dateFromIso.getSeconds()
            });
        } else if (pathName.toLowerCase() === '/api/unixtime') {
            //console.log('UNIX');
            response.writeHead(200, {'Content-Type': 'text/plain'});
            dateOutput = JSON.stringify({
                unixtime: dateFromIso.getTime()
            });
        }
    }

    response.write(dateOutput);
    response.end();
});
server.listen(listenOnPort);

console.log('Server listening on port', server.address().port );

// OFFICIAL SOLUTION
//
//var http = require('http')
//var url = require('url')
//
//function parsetime (time) {
//    return {
//        hour: time.getHours(),
//        minute: time.getMinutes(),
//        second: time.getSeconds()
//    }
//}
//
//function unixtime (time) {
//    return { unixtime : time.getTime() }
//}
//
//var server = http.createServer(function (req, res) {
//    var parsedUrl = url.parse(req.url, true)
//    var time = new Date(parsedUrl.query.iso)
//    var result
//
//    if (/^\/api\/parsetime/.test(req.url))
//        result = parsetime(time)
//    else if (/^\/api\/unixtime/.test(req.url))
//        result = unixtime(time)
//
//    if (result) {
//        res.writeHead(200, { 'Content-Type': 'application/json' })
//        res.end(JSON.stringify(result))
//    } else {
//        res.writeHead(404)
//        res.end()
//    }
//})
//server.listen(Number(process.argv[2]))