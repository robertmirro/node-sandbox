var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

// receive response object from router
function start(response, request) {
    "use strict";

    console.log('  **Request handler "start" was called...', new Date());

    var html_content = '<html>'
        + '<head>'
        + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> '
        + '</head>'
        + '<form action="/upload" enctype="multipart/form-data" method="post">'
        + '<input type="file" name="upload">'
        + '<input type="submit" value="Upload File" />'
        + '</form>'
        + '</body>'
        + '</html>'
        ;

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(html_content);
    response.end();
}

// receive response object from router
function upload(response, request) {
    "use strict";

    console.log('  **Request handler "upload" was called...');

    var form = new formidable.IncomingForm();
    console.log('  ***Parsing started...');

    form.parse(request, function( error, fields, files ) {
        console.log('  ***Parsing complete...');

        /* Possible error on Windows systems: tried to rename to an already existing file */
        fs.rename(files.upload.path, "./tmp/test.png", function(error) {
            if (error) {
                fs.unlink("./tmp/test.png");
                fs.rename(files.upload.path, "./tmp/test.png");
            }
        });

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('Uploaded File Received: ' + new Date());
        response.write('<br /><img src="/show" />')
        response.end();
    });
}

// display uploaded image file to user
function show(response, request) {
    "use strict";

    console.log('  **Request handler "show" was called...');

    fs.readFile('./tmp/test.png', 'binary', function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
