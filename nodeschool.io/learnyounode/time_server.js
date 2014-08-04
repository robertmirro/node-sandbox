var net = require('net');

var listenOnPort = process.argv[2];

function getDateTime() {
    "use strict";

    var seperatorDate = '-';
    var seperatorTime = ':'
    var today = new Date;

    return (today.getFullYear()
        + seperatorDate
        + (today.getMonth() + 1 > 9 ? '' : '0') + (today.getMonth() + 1)
        + seperatorDate
        + (today.getDate() > 9 ? '' : '0')  + today.getDate()
        + ' '
        + (today.getHours() > 9 ? '' : '0')  + today.getHours()
        + seperatorTime
        + (today.getMinutes() > 9 ? '' : '0')  + today.getMinutes()
        );
}

var server = net.createServer( function( socket ) {
    //console.log('Connected to server...', getDateTime());
    socket.write(getDateTime() + '\n');
    socket.end();
});
server.listen( listenOnPort , function() {
    console.log('Server listening on port', server.address().port );
});

// To-Test:
// 0. node time_server.js 8000
// 1. curl http://localhost:8000
// 2. telnet localhost 8000

// OFFICIAL SOLUTION
//
//var net = require('net')
//
//function zeroFill(i) {
//    return (i < 10 ? '0' : '') + i
//}
//
//function now () {
//    var d = new Date()
//    return d.getFullYear() + '-'
//        + zeroFill(d.getMonth() + 1) + '-'
//        + zeroFill(d.getDate()) + ' '
//        + zeroFill(d.getHours()) + ':'
//        + zeroFill(d.getMinutes())
//}
//
//var server = net.createServer(function (socket) {
//    socket.end(now() + '\n')
//})
//
//server.listen(Number(process.argv[2]))