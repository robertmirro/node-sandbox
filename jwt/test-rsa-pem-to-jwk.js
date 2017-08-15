var fs = require('fs');
var rsaPemToJwk = require('rsa-pem-to-jwk');

var pem = fs.readFileSync('private.pem');

var jwk = rsaPemToJwk(pem, { use: 'sig' }, 'public');
console.log('PUBLIC:', jwk);

var jwk2 = rsaPemToJwk(pem, { use: 'sig' }, 'private');
console.log('PRIVATE:', jwk2);
