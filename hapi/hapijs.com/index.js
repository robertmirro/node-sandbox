// curl -s http://localhost:4848

const Hapi = require('hapi');
const Good = require('good');

const err = message => err => {
    if (err) throw err;
    console.log(message);
};

const server = new Hapi.Server();
server.connection({
    labels: ['api'],
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
    handler: (request, reply) => { reply(`GET - root/name: ${encodeURIComponent(request.params.name)}`); }
});

// console.log('server.select(api):', server.select('api'));
server.select('api').route({
    method: 'GET',
    path: '/theapi',
    handler: (request, reply) => { reply('GET - root/theapi'); }
});

server.register(require('./routes/user'), { select: 'api' }, err('routes/users: registered'));

server.register(require('inert'), err => {
    if (err) throw err;

    server.route({
        method: 'GET',
        path: '/staticPage',
        handler: (request, reply) => { reply.file('./staticPage.html'); }
    });
});

server.register(Object.assign(require('./custom-plugin'), { options: { key: 'value' } }), err('custom-plugin: registered'));

server.register({
    register: Good,
    options: { reporters: { console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
            response: '*',
            log: '*'
        }]
    }, { module: 'good-console' }, 'stdout'] } }
}, err => {
    if (err) throw err;

    server.start(err => {
        if (err) throw err;
        server.log('info', `Server listening on ${server.info.uri.toLowerCase()} (${server.version})`);
    });
});

// server.start(err => {
//     if (err) throw err;
//     console.info(`Server listening on ${server.info.uri.toLowerCase()} (${server.version})`);
// });
