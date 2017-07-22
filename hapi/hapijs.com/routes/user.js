const register = (server, options, next) => {
    console.log(`routes/user: registering... options:`, options);

    server.route({
        method: 'GET',
        path: '/list',
        handler: (request, reply) => { reply('GET - user/list'); }
    });

    server.route({
        method: 'GET',
        path: '/{userId}/detail/{version?}',
        handler: (request, reply) => { reply(`GET - user/userId/detail/version: ${encodeURIComponent(request.params.userId)} / ${encodeURIComponent(request.params.version)}`); }
    });

    server.route({
        method: 'GET',
        path: '/{clientPatient*2}/config',
        handler: (request, reply) => {
            const [ clientId, patientId ] = request.params.clientPatient.split('/');
            reply(`GET - user/clientId/patientId/config: ${encodeURIComponent(clientId)} / ${encodeURIComponent(patientId)}`);
        }
    });

    next();
};

register.attributes = {
    name: 'routes/user',
    version: '1.0.0'
};

module.exports = {
    register,
    routes: { prefix: '/user' }
};
