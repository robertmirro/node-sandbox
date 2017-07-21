// curl -s http://localhost:4848

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 4848
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => { reply('GET - root'); }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => { reply(`GET - name: ${encodeURIComponent(request.params.name)}`); }
});

server.register(require('inert'), err => {
    if (err) throw err;

    server.route({
        method: 'GET',
        path: '/staticPage',
        handler: (request, reply) => { reply.file('./staticPage.html'); }
    });
});

server.start(err => {
    if (err) throw err;
    console.info(`Server listening on ${server.info.uri.toLowerCase()} (${server.version})`);
});
