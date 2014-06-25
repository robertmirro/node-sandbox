function start() {
    "use strict";

    console.log('  **Request handler "start" was called...', new Date());

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }
    // simulate a 5 second "blocking" operation delay
    sleep(5000);
    console.log('  **Request handler "start" was called, delay ended...', new Date());

    return 'Hello World from... START!';
}

function upload() {
    "use strict";

    console.log('  **Request handler "upload" was called...');
    return 'Hello World from... UPLOAD!';
}

exports.start = start;
exports.upload = upload;
