const jose = require('node-jose');

const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');

// const pem = fs.readFileSync('jwtRS256.key.pub');
const pem = fs.readFileSync('jwtRS256.pem.public');  // use jwtRS256.pem.public.openssl to verify token on jwt.io
const jwkPublic = rsaPemToJwk(pem, { use: 'sig' }, 'public');

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InFGY194T3VaY0JGZFd4MWdRTFNsZFR4U1NnZFc2TDNSSEJjbmFNa2YtZmcifQ.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IkVsIEJvYmJpbyBpcyBNRSEiLCJyb2xlIjoiYWRtaW4taW8ifQ.hdDMrNXXsuVlEHKKJv6XNi9wjHW558bDd2CpsvZIE3DlVNumpmsRVt3nRdGgRqn6h66jMqhBqVCy1fNw50-rWB2ff3VKr76Xylq7nMSYDsHEZ-IIkdKrveETUVUfT3XxrNPV0c3c3Sy6PkXAOmx8Z0LPdVjZiOYB2vstyYqJUcClQfqQS7KDLMGRIYdkUxbshOk_dcTNk1Gd30wWhN81rK20ZMz33-qI0bzyDFwYkykBUaFmGNoDIpi1qv53ZFsYmlw7J2-p3w6z7eD3Y_OlC-b-PPgFtpWjSGguh31MljmRmjeBF7VruX56QBCpp-dAJi93kPEPlHU7MfKou7k9Bw';
const kid = 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg';
const keyStore = { keys: [ Object.assign(jwkPublic, { kid }) ] };

jose.JWK.asKeyStore(keyStore)
    .then(keystore => {
        const key = keystore.get(kid);
        console.log('keystore JWK-set:', keystore.toJSON());
        console.log('keystore JWK-set true:', keystore.toJSON(true));
        console.log('jwkPublic:', jwkPublic);

        console.log('key:', key);
        console.log('private key (secret) base64 encoded:', key.toJSON(true)); // rsa
        console.log('key signed using:', key.algorithms('sign'));

        return jose.JWS
            .createVerify(keystore)
            .verify(token)
            .then(result => {
                console.log('token header:', result.header);
                console.log('token payload:', result.payload.toString());
            });
    });
