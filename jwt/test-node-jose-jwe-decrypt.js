const jose = require('node-jose');

const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');

// const pem = fs.readFileSync('jwtRS256.pem.private');
const pem = fs.readFileSync('jwtRS256.pem.private');  // use jwtRS256.pem.public.openssl to verify token on jwt.io
const jwkPrivate = rsaPemToJwk(pem, { }, 'private');

const token = 'eyJhbGciOiJSU0EtT0FFUCIsImtpZCI6InFGY194T3VaY0JGZFd4MWdRTFNsZFR4U1NnZFc2TDNSSEJjbmFNa2YtZmciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.PeQ77bzpl9yz9mKhgYj_G1cMKA1r2yhVFYO8LUDap05nohOV42YOOeensSIc_RdRzvyuW7bIqJFh_pHvrZ_ebAG1V47-s8sLinz4iyd_4FdOYL7PlDgwoUbtosC96_DHovg-d6zLlPzWqkv4nynLnCUMmZ9IF6G03BuQeq6tLlUw_KTHAGqXjWcpsB79J_Eb_QG0sEicTN8-ATBDVC_-2kGucrKBJdu52z-MBwGf7aDzUZ7ywEitENqXgvFFfg9kRJwb0qDaMewsrFXB4zzKlVGQtw_GyOEP0e3q9_9qD2rOxY2SFHq2-OntQxdFIXfpOhJL82XntcI35vfmF5RC5A.4xwdqO5pHCTcG0Wf79YwLA.Qe6H7hjG_K-VswPc-MKqNrYVdiW38EdB9hxByaqMwYqZVKiZhpcnKk1V6mLtWC-w1B81mekJ2bmg6dwzxyYtr060Zq6Zl6Xiqtsm3BSqjSY.iJ7ZOUUXhMvMtN7K2lsrZA';
const kid = 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg';
const keyStore = { keys: [ Object.assign(jwkPrivate, { kid }) ] };

jose.JWK.asKeyStore(keyStore)
    .then(keystore => {
        const key = keystore.get(kid);
        console.log('keystore JWK-set:', keystore.toJSON());
        console.log('keystore JWK-set true:', keystore.toJSON(true));

        console.log('key:', key);
        console.log('private key (secret) base64 encoded:', key.toJSON(true)); // rsa
        console.log('key signed using:', key.algorithms('sign'));

        return jose.JWE
            .createDecrypt(keystore)
            .decrypt(token)
            .then(result => {
                console.log('token header:', result.header);
                console.log('token payload:', result.payload.toString());
            });
    });

//         return jose.JWE
//             // .createEncrypt({ format: 'flattened' }, key)
//             .createEncrypt({ format: 'compact' }, key)
//             .update(new Buffer(JSON.stringify(claims)))
//             .final()
//             .then(token => {
//                 console.log('JWE token:', token);

//                 jose.JWE
//                     .createDecrypt(keystore)
//                     .decrypt(token)
//                     .then(result => {
//                         console.log('token header:', result.header);
//                         console.log('token payload:', result.payload.toString());
//                     });
//             });
//     });

// // keystore JWK-set: { keys:
// //    [ { kty: 'oct',
// //        kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg' } ] }
// // keystore JWK-set true: { keys:
// //    [ { kty: 'oct',
// //        kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
// //        k: 'WLny2MXlsbXDEAQaCKnMZX7kvLFP2j9ijZrVnK_krnI' } ] }
// // key: JWKBaseKeyObject {
// //   keystore: JWKStore {},
// //   length: 256,
// //   kty: 'oct',
// //   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
// //   use: '',
// //   alg: '' }
// // private key (secret) base64 encoded: WLny2MXlsbXDEAQaCKnMZX7kvLFP2j9ijZrVnK_krnI
// // key signed using: [ 'A256GCM', 'A128CBC-HS256', 'A128CBC+HS256' ]
// // JWE token: eyJhbGciOiJBMjU2S1ciLCJraWQiOiJxRmNfeE91WmNCRmRXeDFnUUxTbGRUeFNTZ2RXNkwzUkhCY25hTWtmLWZnIiwiZW5jIjoiQTEyOENCQy1IUzI1NiJ9.8y6rwiGC6X3U-Hy6FEDgkrP-RBEqc-pNRlqM4NMMnfDQNx_vqBIaNA.DEMXNj7PmNRncHx9MtIAPQ.xdmEx5wPM8wBUt0zNkTNBLsIzDzEwZi2rEdjvFnAfvTatHVeDJH6HhFz3VeA6graC7Wb2NyRS8UI_XT-T9rQAQ.9bS64-5rvsxkHt-okaiJUw
// // token header: { alg: 'A256KW',
// //   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
// //   enc: 'A128CBC-HS256' }
// // token payload: {"sub":"4848","name":"El Bobbio","role":"admin"}

// ===========================================================================
// ===========================================================================

// const keystore = jose.JWK.createKeyStore();
// keystore
//     .generate('oct', 256)
//     .then(key => {
//         console.log('keystore JWK-set:', keystore.toJSON());
//         console.log('keystore JWK-set true:', keystore.toJSON(true));

//         console.log('key:', key);
//         console.log('private key (secret) base64 encoded:', key.toJSON(true).k);
//         console.log('key signed using:', key.algorithms('encrypt'));

//         return jose.JWE
//             // .createEncrypt({ format: 'flattened' }, key)
//             .createEncrypt({ format: 'compact' }, key)
//             .update(new Buffer(JSON.stringify(claims)))
//             .final()
//             .then(token => {
//                 console.log('JWE token:', token);

//                 jose.JWE
//                     .createDecrypt(keystore)
//                     .decrypt(token)
//                     .then(result => {
//                         console.log('token header:', result.header);
//                         console.log('token payload:', result.payload.toString());
//                     });
//             });
//     });

// // keystore JWK-set: { keys:
// //    [ { kty: 'oct',
// //        kid: 'wIsjvnNLfQCBbCIijUmRWWnj6gOESETAsp__xfOjpcc' } ] }
// // keystore JWK-set true: { keys:
// //    [ { kty: 'oct',
// //        kid: 'wIsjvnNLfQCBbCIijUmRWWnj6gOESETAsp__xfOjpcc',
// //        k: 'aPbPPBSF73HtvyIcmCYUIq-oCU2XeODK54Ydz7nDuLU' } ] }
// // key: JWKBaseKeyObject {
// //   keystore: JWKStore {},
// //   length: 256,
// //   kty: 'oct',
// //   kid: 'wIsjvnNLfQCBbCIijUmRWWnj6gOESETAsp__xfOjpcc',
// //   use: '',
// //   alg: '' }
// // private key (secret) base64 encoded: aPbPPBSF73HtvyIcmCYUIq-oCU2XeODK54Ydz7nDuLU
// // key signed using: [ 'A256GCM', 'A128CBC-HS256', 'A128CBC+HS256' ]
// // JWE token: eyJhbGciOiJBMjU2S1ciLCJraWQiOiJ3SXNqdm5OTGZRQ0JiQ0lpalVtUldXbmo2Z09FU0VUQXNwX194Zk9qcGNjIiwiZW5jIjoiQTEyOENCQy1IUzI1NiJ9.mw_jBObkhg0UgadKFS82PotHd49XahvNudXjM_vVHGNUHrhFkERjfw.C4EB268VPPVtsWCUCGdgtA.buGG5E9KFtiTBXt3sKYsvQbB0NREns5tJ9zBKumF-s7FaQ-HtgpMWOtgUNsyg6N5os5yAewCqcV2AeExTW3BaA.N_uzzMD_Shtjcw3jqZWyOg
// // token header: { alg: 'A256KW',
// //   kid: 'wIsjvnNLfQCBbCIijUmRWWnj6gOESETAsp__xfOjpcc',
// //   enc: 'A128CBC-HS256' }
// // token payload: {"sub":"4848","name":"El Bobbio","role":"admin"}
