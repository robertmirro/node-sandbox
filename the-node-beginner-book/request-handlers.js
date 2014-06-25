var exec = require('child_process').exec;

// receive response object from router
function start(response) {
    "use strict";

    console.log('  **Request handler "start" was called...', new Date());

    var content = 'empty';
    // use child_process.exec to execute a shell command in a non-blocking fashion
    // exec('find /', function( error, stdout, stderr ) {
    // exec('ls -alh /', function( error, stdout, stderr ) {
    exec('find /', function( error, stdout, stderr ) {
        //console.log('Hello World from... START! --- ', stdout);
        console.log('  **Request handler "start" is DONE...', new Date());

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write('Hello World from... START! --- ' + new Date() + '\n' + stdout);
        response.end();
    })
}

// receive response object from router
function upload(response) {
    "use strict";

    console.log('  **Request handler "upload" was called...');

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hello World from... UPLOAD! --- ' + new Date());
    response.end();
}

exports.start = start;
exports.upload = upload;
