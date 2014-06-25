var exec = require('child_process').exec;

function start() {
    "use strict";

    console.log('  **Request handler "start" was called...', new Date());

    var content = 'empty';
    // use child_process.exec to execute a shell command in a non-blocking fashion
    // exec('find /', function( error, stdout, stderr ) {
    exec('ls  -alh', function( error, stdout, stderr ) {
        content = stdout;
        console.log('content 1: ', content);
    })
    console.log('content 2: ', content);

    return 'Hello World from... START! --- ' + content;
}

function upload() {
    "use strict";

    console.log('  **Request handler "upload" was called...');
    return 'Hello World from... UPLOAD!';
}

exports.start = start;
exports.upload = upload;
