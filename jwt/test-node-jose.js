const jose = require('node-jose');

const claims = {
    sub: '4848',
    name: 'El Bobbio is ME!',
    role: 'admin-io'
};

// const keystore = jose.JWK.createKeyStore();
// keystore
//     .generate('oct', 256)
//     // .generate('oct', 256, { kid: 'HO3HRBP5v6b1GJt-3yh3SNEsQC2acOpIye0VEVNu-5U' })
//     .then(key => {
//         console.log('keystore JWK-set:', keystore.toJSON());
//         console.log('keystore JWK-set true:', keystore.toJSON(true));

//         console.log('key:', key);
//         console.log('private key (secret) base64 encoded:', key.toJSON(true).k);
//         console.log('key signed using:', key.algorithms('sign'));

//         return jose.JWS
//             // .createSign({ format: 'flattened' }, key)
//             // .createSign({ alg: 'HS256', format: 'compact' }, key)
//             .createSign({ format: 'compact' }, key)
//             .update(new Buffer(JSON.stringify(claims)))
//             .final()
//             .then(result => { console.log('JWS token:', result); });
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
// // key signed using: [ 'HS256' ]
// // JWS token: eyJhbGciOiJIUzI1NiIsImtpZCI6InFGY194T3VaY0JGZFd4MWdRTFNsZFR4U1NnZFc2TDNSSEJjbmFNa2YtZmcifQ.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IkVsIEJvYmJpbyIsInJvbGUiOiJhZG1pbiJ9.Z0sx33roOMx9u5JSxqR9xshEcDLmHdVAB-y1FkPebTw

// ===========================================================================
// ===========================================================================

// const kid = 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg';
// const keyStore = { keys: [{
//     kty: 'oct',
//     kid,
//     k: 'WLny2MXlsbXDEAQaCKnMZX7kvLFP2j9ijZrVnK_krnI'
// }] };

const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');

// const pem = fs.readFileSync('jwtRS256.key');
const pem = fs.readFileSync('jwtRS256.pem.private');
const jwkPrivate = rsaPemToJwk(pem, { use: 'sig' }, 'private');
const jwkPublic = rsaPemToJwk(pem, { use: 'sig' }, 'public');

const kid = 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg';
const keyStore = { keys: [ Object.assign(jwkPrivate, { kid }) ] };

jose.JWK.asKeyStore(keyStore)
    .then(keystore => {
        const key = keystore.get(kid);
        console.log('keystore JWK-set:', keystore.toJSON());
        console.log('keystore JWK-set true:', keystore.toJSON(true));
        console.log('jwkPublic:', jwkPublic);

        console.log('key:', key);
        // console.log('private key (secret) base64 encoded:', key.toJSON(true).k); // hmac
        console.log('private key (secret) base64 encoded:', key.toJSON(true)); // rsa
        console.log('key signed using:', key.algorithms('sign'));

        return jose.JWS
            // .createSign({ format: 'flattened' }, key)
            // .createSign({ alg: 'HS256', format: 'compact' }, key)
            .createSign({ format: 'compact' }, key)
            .update(new Buffer(JSON.stringify(claims)))
            .final()
            .then(token => {
                console.log('JWS token:', token);

                jose.JWS
                    .createVerify(keystore)
                    .verify(token)
                    .then(result => {
                        console.log('token header:', result.header);
                        console.log('token payload:', result.payload.toString());
                    });
            });
    });

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
// // key signed using: [ 'HS256' ]
// // JWS token: eyJhbGciOiJIUzI1NiIsImtpZCI6InFGY194T3VaY0JGZFd4MWdRTFNsZFR4U1NnZFc2TDNSSEJjbmFNa2YtZmcifQ.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IkVsIEJvYmJpbyIsInJvbGUiOiJhZG1pbiJ9.Z0sx33roOMx9u5JSxqR9xshEcDLmHdVAB-y1FkPebTw
// // token header: { alg: 'HS256',
// //   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg' }
// // token payload: {"sub":"4848","name":"El Bobbio","role":"admin"}

// ===========================================================================
// ===========================================================================

// const keystore = jose.JWK.createKeyStore();
// keystore
//     .generate('RSA', 2048)
//     .then(key => {
//         console.log('keystore JWK-set:', keystore.toJSON());
//         console.log('keystore JWK-set true:', keystore.toJSON(true));

//         console.log('key:', key);
//         console.log('private key (secret) base64 encoded:', key.toJSON(true).k);
//         console.log('key signed using:', key.algorithms('sign'));

//         return jose.JWS
//             // .createSign({ format: 'flattened' }, key)
//             // .createSign({ alg: 'HS256', format: 'compact' }, key)
//             .createSign({ format: 'compact' }, key)
//             .update(new Buffer(JSON.stringify(claims)))
//             .final()
//             .then(token => {
//                 console.log('JWS token:', token);

//                 jose.JWS
//                     .createVerify(keystore)
//                     .verify(token)
//                     .then(result => {
//                         console.log('token header:', result.header);
//                         console.log('token payload:', result.payload.toString());
//                     });
//             });
//     });

// // keystore JWK-set: { keys:
// //    [ { kty: 'RSA',
// //        kid: 'ynyNoWsLvZ6aNjo8f9sImmiB4TcIfmWFtsiDKlTPi7w',
// //        e: 'AQAB',
// //        n: 'jGJ4miVfBnyzmlPze_4yertRU-lAqSCwWkQ2aBztxRETPO7g7tW85Yy4ESPKLyujXhH7a1CRhJW8elv3tdmcUPZ-cLHC0xCRvvheaK82idrzlcta-ZiRXFzs4h7sYu_lQAtsIgT2xiMivWOcvkacSHlQETrMpzyxuOCiQj9oiEnapZ0cGwnUUumWXXw5u8ssE3tjl0Uj9d5k2nN5jCUJoj2JvgcHy2n_j6DXIKJhIZeP5ezecjeebhI1XvNR-4Wze7wtfF1Z9NlVbjfz_-H8xHwmyKQ2ESZ84IO8l9pD6VwULtdLhiPeEfhYM6YWPpMVtnT2JYX4dLS0Q1PWFgFAmw' } ] }
// // keystore JWK-set true: { keys:
// //    [ { kty: 'RSA',
// //        kid: 'ynyNoWsLvZ6aNjo8f9sImmiB4TcIfmWFtsiDKlTPi7w',
// //        e: 'AQAB',
// //        n: 'jGJ4miVfBnyzmlPze_4yertRU-lAqSCwWkQ2aBztxRETPO7g7tW85Yy4ESPKLyujXhH7a1CRhJW8elv3tdmcUPZ-cLHC0xCRvvheaK82idrzlcta-ZiRXFzs4h7sYu_lQAtsIgT2xiMivWOcvkacSHlQETrMpzyxuOCiQj9oiEnapZ0cGwnUUumWXXw5u8ssE3tjl0Uj9d5k2nN5jCUJoj2JvgcHy2n_j6DXIKJhIZeP5ezecjeebhI1XvNR-4Wze7wtfF1Z9NlVbjfz_-H8xHwmyKQ2ESZ84IO8l9pD6VwULtdLhiPeEfhYM6YWPpMVtnT2JYX4dLS0Q1PWFgFAmw',
// //        d: 'iu2UfrAHN2tHbq4wIwAwQqeH16vZUsbH37zrvuMKJ2E7kayxq4qYcu9s5YFuwHnGJf1TvCMyr2xj5w-GuE-P08vs22f_71LReZVgEOd86LZnI1HpSWNET4yi3TBPLaZNULE9JPmWogT5h0XCQ8erOEneA_8Vs1dsZhLgYQFRWLWOfd2bZX1354dLU8nA-2PZvRZ5Wj25b1QY1vHtRcgI29bEUJcI9t9Z-hEoE5006KMZ-ecQzk171q_bKvK0P__AnlCFss__eGTbcj84xHGU7JYVT56kbQz-eXps_2XCfSX_U4xGmwReehONLMQOad6hsoqr83cuGddUO-BC1G3dCQ',
// //        p: 'xc5K9rLfwF1I9uJRdow2YazIIuBnoEAWhcwVbEkF8zSFCE0h5hAqgr31MQvll_RmGAdSD31WG6rBUFU11mqVOz2ko3gfkUW3LRqlkBz-Wdkjqrw8AquiJk2Tx77-4EJyBX_f29yN-ubSKXl5ub-JQ3wYvEnCSndU3_kouohNVcc',
// //        q: 'ta-DdvRcDyHTp_uia8qjOIvnuG-xqrw8diADFcT6M_UrIlI_ftpUnQCdBiXErJN9ya6YbfAvxTFXBW7bz8-u4qxQv75o3q4VCrLihmrPzPChfs0BFNfI_yeZW67KDclCqzyno9y-mqtpWaCkabw6EaFaBod8AlQMSaIzGg0G7o0',
// //        dp: 'v39rFZCwi9QD6nfKNAGkOEWE8DbeO8cvxtKAPvgnGX_T9uhtlAQ8k5yBfr0sxkKmgEa-DB7kOR7DzhjgaTeAR_zyoguOTB75KmJsvKtFFwjfvdBELLWq4ngiRLPEnqnVJzvYJktM7QV_mwVucgRbSAkhDVA_F8aVVcwqwQNqE0s',
// //        dq: 'Z3JmtR1PKWKGQ9g3044OP00Rg-c8zszc1BlICGYeW-UVSTZxZsXjdX166pwojmZwMZxSuA4Q9QMx3CsRxxImLnQUighdZ6TQ4EWYSxaX-MVt_me1XOu8SuN-I0CzVQQqDJu9i8RNVn2Qv3KDCp0cpxsqyhrsVdsLIAXVeNjAAKU',
// //        qi: 'TGstLY8CPspvzQOjf5lOPuR1-sp92qRqSOXtPUDm1P-U7tIuyG1GW2dUidYxXjaGIWDOlg2bPyyZDhVqUV5h5snVXoYG3yfeVbRnn1MoVMFukIQ9tO87VCJycAHN28m0qXnSj3aDVma5rfMpgj1Xo8a5nxydHlyTU1C11ROSAvw' } ] }
// // key: JWKBaseKeyObject {
// //   keystore: JWKStore {},
// //   length: 2048,
// //   kty: 'RSA',
// //   kid: 'ynyNoWsLvZ6aNjo8f9sImmiB4TcIfmWFtsiDKlTPi7w',
// //   use: '',
// //   alg: '' }
// // private key (secret) base64 encoded: undefined
// // key signed using: [ 'RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512' ]
// // JWS token: eyJhbGciOiJSUzI1NiIsImtpZCI6InlueU5vV3NMdlo2YU5qbzhmOXNJbW1pQjRUY0lmbVdGdHNpREtsVFBpN3cifQ.eyJzdWIiOiI0ODQ4IiwibmFtZSI6IkVsIEJvYmJpbyIsInJvbGUiOiJhZG1pbiJ9.ikqp2QdpPhwtR3qz28VR5ULPzM8vFyDvPYQTyRSJvMU6Td5n8XGV2hAXs9bv80hIhFMHFDFgOwVgZoqyBe03UfMGsGVQtvS4uXKChbmuL4zD3Z_VUqzzSO311PeqL4oIgtmTmzscNK5qxiAynVIQE2JvkU9Geyd9gGZRbNnbH3SlwBHD08ADmN0a7vtDP1JpYLvf1fIYGI5N9HtpnNz_N9n3X1w4z0YjNtWXm7XZstrDniKLTZISxhp4B4mJw0r6SnGBR5LramtVU6NBHpYiG74Fywb8CmhRa2H3ASbB8qORX1Bu4wtnKfTjNVCuG4dVJLi_zsduxa33_gsTFAUgkA
// // token header: { alg: 'RS256',
// //   kid: 'ynyNoWsLvZ6aNjo8f9sImmiB4TcIfmWFtsiDKlTPi7w' }
// // token payload: {"sub":"4848","name":"El Bobbio","role":"admin"}

// ===========================================================================
// ===========================================================================

// const kid = 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg';
// const keyStore = { keys: [{
//     kty: 'oct',
//     kid,
//     k: 'WLny2MXlsbXDEAQaCKnMZX7kvLFP2j9ijZrVnK_krnI'
// }] };

// jose.JWK.asKeyStore(keyStore)
//     .then(keystore => {
//         const key = keystore.get(kid);
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
