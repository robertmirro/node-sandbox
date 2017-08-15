const jose = require('node-jose');
const base64url = require('base64url');

// const jwtElement = element => JSON.parse(base64url.decode(element));

const claims = {
    sub: '4848',
    name: 'El Bobbio is ME!',
    role: 'admin-io'
};

const kid = 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E';

// const keystore = jose.JWK.createKeyStore();
// keystore
//     .generate('oct', 256, {
//         kid,
//         alg: 'A256GCM',
//         use: 'enc'
//     })
//     .then(key => {
//         console.log('keystore JWK-set:', keystore.toJSON());
//         console.log('keystore JWK-set true:', keystore.toJSON(true));
//         console.log('key:', key);
//         console.log('key true:', key.toJSON(true));
//     });
// // keystore JWK-set: { keys:
// //    [ { kty: 'oct',
// //        kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //        use: 'enc',
// //        alg: 'A256GCM' } ] }
// // keystore JWK-set true: { keys:
// //    [ { kty: 'oct',
// //        kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //        use: 'enc',
// //        alg: 'A256GCM',
// //        k: 'aHixx1ZicktVRHD9YmV_YODUPbCdSKvCWKp51fJJvmo' } ] }
// // key: JWKBaseKeyObject {
// //   keystore: JWKStore {},
// //   length: 256,
// //   kty: 'oct',
// //   kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //   use: 'enc',
// //   alg: 'A256GCM' }
// // key true: { kty: 'oct',
// //   kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //   use: 'enc',
// //   alg: 'A256GCM',
// //   k: 'aHixx1ZicktVRHD9YmV_YODUPbCdSKvCWKp51fJJvmo' }

const keyStore = { keys: [{
    kty: 'oct',
    // kid,
    use: 'enc',
    alg: 'A256GCM',
    k: base64url('A8E30821A0EEFB5A8EDB289D3032B3C8') // k(orig): 'aHixx1ZicktVRHD9YmV_YODUPbCdSKvCWKp51fJJvmo', k(K2): 'A8E30821A0EEFB5A8EDB289D3032B3C8'
}] };
jose.JWK.asKeyStore(keyStore)
    .then(keystore => {
        console.log('keystore JWK-set:', keystore.toJSON());
        console.log('keystore JWK-set true:', keystore.toJSON(true));

        // const key = keystore.get(kid);
        // console.log('key:', key);
        // console.log('key true:', key.toJSON(true));
        // console.log('key algorithms: encrypt:', key.algorithms('encrypt'));
        // console.log('key algorithms: encrypt:', key.algorithms('wrap'));

        return jose.JWE
            .createDecrypt(keystore)
            .decrypt('eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..0lrvYxsIUwd9sAiT.z_U_hsIzIujDHsCGHxLy9ZM1xox4-37lv-9aGcFJ28t5vn0z6EgESnVDg_njcTEDI9bRb_f5VN-ktspfqin9hJKP9YDRtSN3amtusthjDYrYWhKQUdaEi0V1HgNBqRwZSJNYZ7aXnERGeZzem59kAargapvJ2R_MFekn36Tjlf3x9BCVD6X9qAyOp8_tGtw5WCCNyvuOA_aNXtAdtSEi0KnMCg0M-jewTbtVDJ7OhNQk3QrDSuv6InU3SyZH3wQbm3eaDXyiUiLqmyHQYS50h7Qqooce0lziykS5QQ5O0GHTg-k1-G0K47fnECfj_foJPZUKz5IHSYji2eug8KUEOOaueYuC-Z8cgV3uKe99ri0p20HQzeXYhh-UlupX2P3oaafnwAlwv6bFxXNyLeuck8Y9Vt8wFS9E0LzHcYW5qFkRIkQ9TlYav-2HNaXQSAljLYHpp5IP_NBnGegPz6GH-fH5Fr1Hoq9Mw2-AutyZr0nZjftGZsyeTwIqB6nd_Kfk7KmoYe0ugLIjw70ZfHME3A4o7P6ukw5NjVn1UYyI3gu_S3SrDwJFel2-ZvcuivtxvTyt1K5DwW2gZyKIXdBqTUmQcGVgBdUNhRzqNxjkmLiKaNtxX4wuqS3lOKn5mCXra73KFORC622iNlXCIF1Wbbp7YHuH9DjDOZWBttrGWaXUZTw1Gh2AJBxaqvs9aOpnBnIEP3IraZMILaKzWJobdIKxR2b5IQ2oVGaDJiY6Zd8GQkJd4p8lUteKt1u7QqxX3lSEjeof8r-vuEDnSgOUGARVoMQd8XxfqTBZv5ayqufJO0ivK6uEoobJnruBdObv1jQwz3d-bIcLXOh_S2OY5h0yy7JG69Y2MMLSzh9C3VGwfo5RzrcXFCucBQfsdUlS-ysAKm-6DsnWqTaMheczZToAQgM4oePmaiuyIeiAiKS2pJ8-NeG9mN6A7lImz3xuCh6wMsLimpUxdolTo22vCRrs1oMOT-WuZmJ8ibzKNwV0mqc-ShQiVd5uzVktUVAiGQCLQjHjRi31vI2eoRJAvqsSMXYPl-01mckJQ7qQj-fbAuTYJWU3nauANzbwqyxX6na2n7lYqHoPDlvRQujg2Pn-4AWpqmUdT4blH0Kki5UhxvZ40wQBTgkXic7ZnaKEWUtPfA3yK3nfVEtsntJpcBglyazmZ0GsZcAwuAe0uhnIPuULOeGcM7LmHjwO9vYr5fA_5swN68f2WyQ2NV3xOVY4qY32QvBbgfGed3jRt5W94Ulxve6GchKG0wgVtbup-IytydzRu6BwRjRMjo39c5sqg9q9RHPBS2J1Y-qSkUSc0KMEmF7KaE63P_MZpjIKYqPbPRhhNj3ZOW_c-2B-hpYdM2_m8JyFfIRSAj0L_JZrGBc1jK-R6Imnj1nGtr9ItPNXmgHibnGJ7KJAXg9nr5chJDyHzSYRCLBJQpZqPBnzeXSdHacRzkslPR-iG7_JVdOZ8M3In9JRcQcFhwggU7HPnNTQ0TQTGg6NZHNo7JBLmpCpO4-9ACWcP2TEvL1IGMQBivpLRPriwMDOkOHcZYz0UsYLYtOnvGuW-2w_wyKAfWKIvaxefM4ctSgRtEk_5szkAO68u0eG7M-Xe2QP7B-pg-etLUIu5xLCdECLght2TlJUMMUh7UmXRacokSsXm8c-7sGK02e-FcRIS9usrnqxfGgovLIzPvFHzZdn7veIvUSuin6bajaaMkef0YrVct1H2qzRc_W36-Rszkaawt-oxRsPnOQKHmbvMQwh5VNb9gNqfjtkZOWT93cx2V7gvuv9NE5uY7ku8MQ6veiGo3fgizWsO7ODLB_K-BX16zewJ39lsUmNRWxLmIdgNj-IyH1A43C8ZliNJz-dLZey8r2l9Z47Gfr-laYE1fib66f5PexyShz2HNO0A-GPNM5dyH2Hz83KAAkBWkIAtUL5kYzA_Xg6FMyM_TU67973AipzoAHYplGT10_idjkIAJR-oTVA9TX09z_a5PHiHc__6CVrWX9sqEft-BvpKNNVhRczmdbMXwo0y2baA2T7_kJW9pkWNL-0iWkgIwbkF6VFS00-k7FUs-bOssusTK_ORLexhmSxq2hx5ktYeoCvJynqzrcu9iG5N-Ce9yCVAiKozM6Bygah9JIZOFYCKtiR5b6ZsZCG5lPzQaFyMqvFJKPWxw7Z_jTjAlc8M0U1vkQKckVEWYpUx-6NRihlEZ0oFhYQvDbOmWrO58n23BjNySNInTVb8MNd3XT_tOiBn7xshIJtfcyElid99JAqzJKY2pqGMIILsKgnmNZ-WVd_LUi85HTJHICFBj5fyQMCpYqm9PpC6bbA4mkJvcWY7vUuVZdmpEWhfzeyQgGKCTCMZUPbL0Ge2EH0X-8KwglI-eEC1uveKhKpaZYvX-sFRffMX247hkzmxJtVSlMpGvto9da9L4uGbKAL2jC_Mxh4LfXvwnx3cCGWvQd-jSXYV-2DoHhpo2G92L19W5T6OqZrs_bgyl5WNT17PeK9so8PhOH4XkAH7qC4kw6UIWQgzZXpns7FT50E7e9zUD8yWtgjYx99F8HFsoLR8P25u3bwHQL3r67e-KuQkeQMfqHpixNHMCWvbDLgS60jv7BZrObD_xVBQqxFwSj5F1cVioiPpOshvA6Rjd_3rdBrhZgcuONHLlgzQA_v288KntrguoYIal1sXuemZIwu4UGrJJUSUzJXEwUpzYzQQ63Un7Mi-GUmf5IRt-ASeJyeWuv3MEWco2VsKWq0P5NeptK3kjssaXLb3n6GO95InplovGVanSOyTLdc6GCdeesiFQLfJ7uA28WIi1sAssmgzBQjWXET3qUab37q1E5bWrWndgHpPfMxYNQRWYJthYp8ADuARyCBQMuRkpghBIo_4puiymeUOgflxFE567if7TCS3FuXGv9BKN0DMTDePiFEX0IxYzrfi6Jc6PQcuOnR20aflXJ6EaOYVZ9zSRBzAB-uCQtdoIz8I6o-mY0ifh1ZqH7CPO7f-s1rBQTOVb2P3rwKScufVC2j2HJ7W-va63Djj_P0xZSiAhTH3S5ksbw1Mdngwegj7DkCAazbW-10-A0oAH4_TGHog3KQpJvb1YzUTxql7FP_5GWwzFzF7yPQ1a-Hd8cBbBnN8-ky9ywmikMmRkYpinyPiUkMFlNtW4RakxirlxT9sNzZroa233q7kRfLdu6lgTxp6OgOe3t-zu4s08i_CIXuvYCMAm59nmz0mm8vMf1-W5u1_nFnJ6N1pdzoUB1RttyRkR5J3nu51Xtiuh-9ggq2253w9r6f-m0v1ZmToYZNsxKNbOTLNMStteAHVOihebOxsCIBu4UDS-JgsFHVC_7PoImPA0qwO5D6khiMDLWVXYzJt3PQH6g3s_oJjHWZWcIXe1GoBqltlj8KiZlGj13WXQg4IzG0k_mpjECvYrQjfInvp-pg7Yg7G9w5yICwYkuqfocYaxfBnCD8VQcHMvGQbKci_oQq2Fz1XQcICzuraS7a_3rYrGBxVBpad0SifUhaEjVHAKyv5nR_mVurAGG7rz3Ip5qCY7Jj3qhtX4OeJ-dG4v3rjcKF_UjqekeQ01Y1N0d5lhTl-Ab-FZZ1t-gFQUgUxFPFQcWcfj_rkRRFlNv7hhRt0n6pXbAFWeM8ID36vOLAb9-RanOd1_ot5eXel2YrxpM1aNAZO5pohYb-LkUapN87VKUHIdfSH4Ba98UXAQYcQgZY7_mgknHVcKHvItErNtUxY0lJfLbWrDQneg4W-wgIZPkS13pKtmCPJlv3PHiPrdhX4WaCPN1ZBtenWiKk18XGcCbndetCyMXtbO-TAjCIPmOTRu5lb8xX8tHHAjWtCmJXveWpHvZ6ggzMKWdzXlM9TiELVIATbLZDZfRnVFyjW1LqzSNUkxBsjmMFl_l7QH2OLmfTvwxKzIc_JZOgawZa8OPILUSnOjyGwyA_ghECKfq5KuwllcJoODxJo_8vUcgTPOWxVQGw_788WVd4946gWj2mGb2TqDoNG-6mZxIGeS5Xjm3STlW3U7Hpl5W9ufrujI1O9YmQ0SZt7EvDk6Rua9rDdulJBlrvNmHNVRKjJs21qg_xCMSwzm3tHwFawFzZdnkNvKZdgIfWV_KFGJz7XMdWKHh2849gocabpH0708VlGJV5JyMAUVJ0.qkqDDer6QGqgGQRBWWEyxQ')
            .then(result => {
                console.log('token header:', result.header);
                console.log('token payload:', result.payload.toString());
            });
    })
    .catch(reason => {
        console.log('reason:', reason);
    });
// // keystore JWK-set: { keys:
// //    [ { kty: 'oct',
// //        kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //        use: 'enc',
// //        alg: 'A256GCM' } ] }
// // keystore JWK-set true: { keys:
// //    [ { kty: 'oct',
// //        kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //        use: 'enc',
// //        alg: 'A256GCM',
// //        k: 'aHixx1ZicktVRHD9YmV_YODUPbCdSKvCWKp51fJJvmo' } ] }
// // key: JWKBaseKeyObject {
// //   keystore: JWKStore {},
// //   length: 256,
// //   kty: 'oct',
// //   kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //   use: 'enc',
// //   alg: 'A256GCM' }
// // key true: { kty: 'oct',
// //   kid: 'fguOBrpkxKV5FLF974tkmujUfteNAEELRWmbjuoEJ8E',
// //   use: 'enc',
// //   alg: 'A256GCM',
// //   k: 'aHixx1ZicktVRHD9YmV_YODUPbCdSKvCWKp51fJJvmo' }
// // key algorithms: encrypt: [ 'A256GCM' ]
// // (node:1168) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): Error: decryption failed
