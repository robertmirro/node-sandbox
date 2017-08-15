const jws = require('jws');
const fs = require('fs');
const crypto = require('crypto');
const base64url = require('base64url');

let jwt, signer, signature;

const jwtElement = element => JSON.parse(base64url.decode(element));

const HS256 = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IlNpZ25lZCB2aWEgSFMyNTYgLSBKV1MiLCJyb2xlIjoiYWRtaW4ifQ.NjXs8MVoicZaUfPUQi-vKc8ASyMfFluiFj2XINsSyYI',
    tokenManual: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IlNpZ25lZCB2aWEgSFMyNTYgLSBKV1MgLSBNQU5VQUxMWSIsInJvbGUiOiJhZG1pbiJ9.KXRQfKm71fvmYMkL4TgkNZcoI4KkDFUFjhaKLGc_fEI',
    secret: 'thesecret'
};

const RS256 = {
    token: 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0ODQ4NDgiLCJuYW1lIjoiU2lnbmVkIHZpYSBSUzI1NiAtIEpXUyIsInJvbGUiOiJzdXBlciBhZG1pbiJ9.U2Ieyz8OLANSOdpU44s53rXasQ_2aa6tgNlKz4MobzsZcpn27RIlAfCIPzxZsoFfQQgJul4wBokb0AH2oWMiAHgZF7r877j2cb-ffQ2ZjALyFm4jfZIf3hyY9HjxMK6-U0j88UMOl_yP4fsz2X_pKU5qaYixAsm_1R7rPjEfa0HmevvOc0_4EWLTLYUeYHmb9Kb1oOg-pO6w8vb5eYbds8pZdsjyofkgHJtdpv1XOK694L9OPpTAwo9rIp35z9yWta31OH-qARyH4iVpDkPoF5DnbK8jarWzMsTE1z637XZmMT--6LHweFvi1BqaFfViX5PZ7J8EU1IPIK4IlCbh-g',
    tokenManual: 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0ODQ4NDgiLCJuYW1lIjoiU2lnbmVkIHZpYSBSUzI1NiAtIEpXUyAtIE1BTlVBTExZIiwicm9sZSI6InN1cGVyIGFkbWluIn0.UpoqnBRheynBtAk_k31VJ1pI2O8ER4AvWWmUDTqQm_iDP8nV-GqtZP2T-yDhAnPrBySePxrfTIs6z65P3WSP7WpyVh7VhVHVQbILVcGtsbXaI-O-Zry4gpDziHmHk5LCqOXf7P-bTP8fnWUaB7hDB87NOJbH6GMQ2ng9KtQxuxc5jTsXX1Ib-7K7n2_vwYgkt9YMgjNhctrDcvIK-LJ12NY3W2ocnAfZUYvH6O-otXs32cBHqddp6QYXimHuxbQXn3sLpaFns-hPzs9NxfrokeeAcjn9l8qWE7R10Lv2g2LiftbxLeJFSvrwbUcvwpnktSYifoEDBSdXZmvmqE5Y-w',
    privateKey: fs.readFileSync('jwtRS256.pem.private'),
    publicKey: fs.readFileSync('jwtRS256.pem.public')
};

console.log('JWS decode - HS256:', jws.decode(HS256.token));
// JWS decode - HS256: {
//     header: { alg: 'HS256' },
//     payload: '{"sub":"4848","name":"Signed via HS256 - JWS","role":"admin"}',
//     signature: 'NjXs8MVoicZaUfPUQi-vKc8ASyMfFluiFj2XINsSyYI'
// }

console.log('JWS verify - HS256:', jws.verify(HS256.token, 'HS256', HS256.secret));
// JWS verify - HS256: true

jwt = HS256.tokenManual.split('.');
console.log('JWS decode - HS256 - MANUALLY:', {
    header: jwtElement(jwt[0]),
    payload: jwtElement(jwt[1]),
    signature: jwt[2]
});
// JWS decode - HS256 - MANUALLY: {
//     header: { alg: 'HS256' },
//     payload: {
//         sub: '4848',
//         name: 'Signed via HS256 - JWS - MANUALLY',
//         role: 'admin'
//     },
//     signature: 'KXRQfKm71fvmYMkL4TgkNZcoI4KkDFUFjhaKLGc_fEI'
// }

jwt = HS256.tokenManual.split('.');
signer = crypto.createHmac('sha256', HS256.secret);
signer.update(`${jwt[0]}.${jwt[1]}`);
signature = base64url.fromBase64(signer.digest('base64'));
console.log('JWS verify - HS256 - MANUALLY:', signature === jwt[2]);
// JWS verify - HS256 - MANUALLY: true

// ===========================================================================
// ===========================================================================

console.log('JWS decode - RS256:', jws.decode(RS256.token));
// JWS decode - RS256: {
//     header: { alg: 'RS256' },
//     payload: '{"sub":"484848","name":"Signed via RS256 - JWS","role":"super admin"}',
//     signature: 'U2Ieyz8OLANSOdpU44s53rXasQ_2aa6tgNlKz4MobzsZcpn27RIlAfCIPzxZsoFfQQgJul4wBokb0AH2oWMiAHgZF7r877j2cb-ffQ2ZjALyFm4jfZIf3hyY9HjxMK6-U0j88UMOl_yP4fsz2X_pKU5qaYixAsm_1R7rPjEfa0HmevvOc0_4EWLTLYUeYHmb9Kb1oOg-pO6w8vb5eYbds8pZdsjyofkgHJtdpv1XOK694L9OPpTAwo9rIp35z9yWta31OH-qARyH4iVpDkPoF5DnbK8jarWzMsTE1z637XZmMT--6LHweFvi1BqaFfViX5PZ7J8EU1IPIK4IlCbh-g'
// }

console.log('JWS verify - RS256:', jws.verify(RS256.token, 'RS256', RS256.publicKey));
// JWS verify - RS256: true

jwt = RS256.tokenManual.split('.');
console.log('JWS decode - HS256 - MANUALLY:', {
    header: jwtElement(jwt[0]),
    payload: jwtElement(jwt[1]),
    signature: jwt[2]
});
// JWS decode - HS256 - MANUALLY: {
//     header: { alg: 'RS256' },
//     payload: {
//         sub: '484848',
//         name: 'Signed via RS256 - JWS - MANUALLY',
//         role: 'super admin'
//     },
//     signature: 'UpoqnBRheynBtAk_k31VJ1pI2O8ER4AvWWmUDTqQm_iDP8nV-GqtZP2T-yDhAnPrBySePxrfTIs6z65P3WSP7WpyVh7VhVHVQbILVcGtsbXaI-O-Zry4gpDziHmHk5LCqOXf7P-bTP8fnWUaB7hDB87NOJbH6GMQ2ng9KtQxuxc5jTsXX1Ib-7K7n2_vwYgkt9YMgjNhctrDcvIK-LJ12NY3W2ocnAfZUYvH6O-otXs32cBHqddp6QYXimHuxbQXn3sLpaFns-hPzs9NxfrokeeAcjn9l8qWE7R10Lv2g2LiftbxLeJFSvrwbUcvwpnktSYifoEDBSdXZmvmqE5Y-w'
// }
