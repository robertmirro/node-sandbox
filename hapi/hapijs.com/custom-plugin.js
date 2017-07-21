const register = (server, options, next) => {
    console.log(`custom-plugin: registering... options:`, options);
    next();
};

register.attributes = {
    name: 'custom-plugin',
    version: '1.0.0'
};

module.exports = { register };
