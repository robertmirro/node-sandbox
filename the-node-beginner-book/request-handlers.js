function start() {
    "use strict";

    console.log('  **Request handler "start" was called...');
    return 'Hello World from... START!';
}

function upload() {
    "use strict";

    console.log('  **Request handler "upload" was called...');
    return 'Hello World from... UPLOAD!';
}

exports.start = start;
exports.upload = upload;
