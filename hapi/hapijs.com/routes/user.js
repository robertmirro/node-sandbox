const register = (server, options, next) => {
    console.log(`routes/users: registering... options:`, options);

    server.route({
        method: 'GET',
        path: '/list',
        handler: (request, reply) => { reply('GET - user/list'); }
    });

    server.route({
        method: 'GET',
        path: '/detail',
        handler: (request, reply) => { reply('GET - user/detail'); }
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
