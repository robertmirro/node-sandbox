var redis = require('redis');
var client = redis.createClient();

// these commands are non-blocking
client.set('message1', 'hello, yes this is dog');
client.set('message2', 'hello, no this is spider');

client.get('message1', function ( err, reply ) {
    console.log('message1: ', reply);
})