const jws = require('jws');
const fs = require('fs');
const crypto = require('crypto');
const base64url = require('base64url');

let payload, signer, signature;

const payloadElement = element => base64url(JSON.stringify(element));

const HS256 = {
    header: { alg: 'HS256' },
    claims: {
        sub: '4848',
        name: 'Signed via HS256 - JWS',
        role: 'admin'
    },
    secret: 'thesecret'
};

console.log('JWS token - HS256:', jws.sign({
    header: HS256.header,
    payload: HS256.claims,
    secret: HS256.secret
}));
// JWS token - HS256: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IlNpZ25lZCB2aWEgSFMyNTYgLSBKV1MiLCJyb2xlIjoiYWRtaW4ifQ.NjXs8MVoicZaUfPUQi-vKc8ASyMfFluiFj2XINsSyYI

HS256.claims.name += ' - MANUALLY';
payload = `${payloadElement(HS256.header)}.${payloadElement(HS256.claims)}`;
signer = crypto.createHmac('sha256', HS256.secret);
signer.update(payload);
signature = signer.digest('base64');
console.log('JWS token - HS256 - MANUALLY:', `${payload}.${base64url.fromBase64(signature)}`);
// JWS token - HS256 - MANUALLY: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IlNpZ25lZCB2aWEgSFMyNTYgLSBKV1MgLSBNQU5VQUxMWSIsInJvbGUiOiJhZG1pbiJ9.KXRQfKm71fvmYMkL4TgkNZcoI4KkDFUFjhaKLGc_fEI

// ===========================================================================
// ===========================================================================

const RS256 = {
    header: { alg: 'RS256' },
    claims: {
        sub: '484848',
        name: 'Signed via RS256 - JWS',
        role: 'super admin'
    },
    privateKey: fs.readFileSync('jwtRS256.pem.private')
};

console.log('JWS token - RS256:', jws.sign({
    header: RS256.header,
    payload: RS256.claims,
    secret: RS256.privateKey
}));
// JWS token - RS256:

RS256.claims.name += ' - MANUALLY';
payload = `${payloadElement(RS256.header)}.${payloadElement(RS256.claims)}`;
signer = crypto.createSign('RSA-SHA256');
signer.update(payload);
signature = signer.sign(RS256.privateKey, 'base64');
console.log('JWS token - RS256 - MANUALLY:', `${payload}.${base64url.fromBase64(signature)}`);
// JWS token - RS256 - MANUALLY: eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0ODQ4NDgiLCJuYW1lIjoiU2lnbmVkIHZpYSBSUzI1NiAtIEpXUyAtIE1BTlVBTExZIiwicm9sZSI6InN1cGVyIGFkbWluIn0.UpoqnBRheynBtAk_k31VJ1pI2O8ER4AvWWmUDTqQm_iDP8nV-GqtZP2T-yDhAnPrBySePxrfTIs6z65P3WSP7WpyVh7VhVHVQbILVcGtsbXaI-O-Zry4gpDziHmHk5LCqOXf7P-bTP8fnWUaB7hDB87NOJbH6GMQ2ng9KtQxuxc5jTsXX1Ib-7K7n2_vwYgkt9YMgjNhctrDcvIK-LJ12NY3W2ocnAfZUYvH6O-otXs32cBHqddp6QYXimHuxbQXn3sLpaFns-hPzs9NxfrokeeAcjn9l8qWE7R10Lv2g2LiftbxLeJFSvrwbUcvwpnktSYifoEDBSdXZmvmqE5Y-w
