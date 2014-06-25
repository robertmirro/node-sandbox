
// receive response object from server
function route(handle, pathname, response, postData) {
    "use strict";

    console.log('  **Routing request for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        // pass response object along to request handler
        return handle[pathname](response, postData);
    } else {
        console.log('  ****No request handler found for ' + pathname);
        // need to output 404 content from this router now that server no longer handles outputting content
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
