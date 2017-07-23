const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 4848
});

server.register({
    register: require('good'),
    options: {
        ops: false,
        reporters: { toConsole: [
            {
                module: 'good-console',
                args: [{
                    log: '*',
                    response: '*'
                }]
            },
            'stdout'
        ] }
    }
}, err => {
    if (err) throw err;

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => { reply('route - root'); }
    });
});

server.start(() => { console.log(`Server started at ${server.info.uri}`); });
