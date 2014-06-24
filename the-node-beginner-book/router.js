
function route(handle, pathname) {
    "use strict";
    console.log('  **Routing request for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    } else {
        console.log('  ****No request handler found for ' + pathname);
        return '404 Not Found';
    }
}

exports.route = route;
