var exec = require('child_process').exec;
var querystring = require('querystring');

// receive response object from router
function start(response, postData) {
    "use strict";

    console.log('  **Request handler "start" was called...', new Date());

    var html_content = '<html>'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> '
        + '</head>'
        + '<form action="/upload" method="post">'
        + '<textarea name="text" rows="15" cols="60"></textarea><br />'
        + '<input type="submit" value="Submit Me" />'
        + '</form>'
        + '</body>'
        + '</html>'
        ;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html_content);
    response.end();
}

// receive response object from router
function upload(response, postData) {
    "use strict";

    console.log('  **Request handler "upload" was called...');

    postData = querystring.parse(postData).text || 'No data has been posted.';

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write('Hello World from... UPLOAD! --- ' + new Date());
    response.write('\nYou have posted the following data:\n\n' + postData /* querystring.parse(postData).text */ );
    response.end();
}

exports.start = start;
exports.upload = upload;
