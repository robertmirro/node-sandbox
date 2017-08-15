var nJwt = require('njwt');
// var secureRandom = require('secure-random');

// var signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes
var signingKey = 'secret'; // Create a highly random byte array of 256 bytes

var claims = {
    sub: '4848',
    name: 'El Bobbio',
    role: 'admin'
};

var jwt = nJwt.create(claims, signingKey);

console.log(jwt);

var c = jwt.compact();

console.log(c);
