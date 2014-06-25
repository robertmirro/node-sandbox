var server = require('./server');
var router = require('./router');
var requestHandlers = require('./request-handlers');

// build an object to handle routing to appropriate request handlers
// in this case "handle" is more like a thing, but its named like a verb because of how it will be used by the router
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

server.start(router.route, handle);