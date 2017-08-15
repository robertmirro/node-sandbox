const jose = require('node-jose');

const claims = {
    sub: '4848',
    name: 'El Bobbio is ME and I am encrypted!',
    role: 'admin-io'
};

const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');

const pem = fs.readFileSync('jwtRS256.pem.private');
// const jwkPrivate = rsaPemToJwk(pem, { use: 'sig' }, 'private');
const jwkPrivate = rsaPemToJwk(pem, { }, 'private');

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
            .createEncrypt({ format: 'compact' }, key)
            .update(new Buffer(JSON.stringify(claims)))
            .final()
            .then(token => {
                console.log('JWE token:', token);

                jose.JWE
                    .createDecrypt(keystore)
                    .decrypt(token)
                    .then(result => {
                        console.log('token header:', result.header);
                        console.log('token payload:', result.payload.toString());
                    });
            });
    });

// keystore JWK-set: { keys:
//    [ { kty: 'RSA',
//        kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
//        n: 'ANW7fav7qv0Dk-tcW7CRAMPsKyGiPWtOIoF9n0INpygN_fG9gHbTv08VgrOp_JQvoEaGdnA5Q1zlO6s5uidvM1NBztPFWVYLTS08YYTu0NP8yB1e7_J0a1rtHrIGfb5jEytoLxOQQUxRVo5yZrXr0vJXztRGUBU70RksroRjbAsrmM4ISZnUDn_joG0BfLPGL50IqonPAMAzfaEj_S53sNzMCCy_H3f7uT2xS9UlE32tvV_zBV9OifTwzsZlhWT26Wu46pPn2QItub4sg3brnFRD6668JuovyHjr5M0rO2pE5MnkZjSBJBulQdCJTkDb5TTZVlqbqF8iqfrniwQfH0k',
//        e: 'AQAB' } ] }
// keystore JWK-set true: { keys:
//    [ { kty: 'RSA',
//        kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
//        n: 'ANW7fav7qv0Dk-tcW7CRAMPsKyGiPWtOIoF9n0INpygN_fG9gHbTv08VgrOp_JQvoEaGdnA5Q1zlO6s5uidvM1NBztPFWVYLTS08YYTu0NP8yB1e7_J0a1rtHrIGfb5jEytoLxOQQUxRVo5yZrXr0vJXztRGUBU70RksroRjbAsrmM4ISZnUDn_joG0BfLPGL50IqonPAMAzfaEj_S53sNzMCCy_H3f7uT2xS9UlE32tvV_zBV9OifTwzsZlhWT26Wu46pPn2QItub4sg3brnFRD6668JuovyHjr5M0rO2pE5MnkZjSBJBulQdCJTkDb5TTZVlqbqF8iqfrniwQfH0k',
//        e: 'AQAB',
//        d: 'NpIJc0jtjm5EbTqGmp1bQariFFNVNTmc680ERZwwyrRP21IUI8LKvMl0NqU3PSqv1HHueZbVUTmiM4Sot_rXcvGBemaP-b0m9l7NU2CaZxXKjl04DIKXCn8ycCfiISMwuMuAAZG6al72J6aj_Nz6Xi_3OhG9zr4YFEJpSJoN8we2JRrwCkMHnfWOSW2cv8Cea8Iq58ce-2a-Cdmh65ervQbRicDhzH-G_To3QWGInUr5h93QC7qbKYHK4R7A8Xtz0ShF3qLGKATT_S6awhg3x4oKyWfRcgui2-as2E7SF2BBq14nht73JbAD4ww5-adDYzRzd6rbrSi5UFBmFMK40Q',
//        p: 'AO1hT7-c40x5mDiNZRtU-x-geQODSNCVeQJznznMtJecTAy2WWVCKxfhUWX6La8D8-LNvrITyRtQQ_AUZoVuwc-w4TjKapa42CjmvVO_gnFOdzKfaCUZYZLwmddlGZuasjfSCTieCreAYe2rA0CXz4q85dDxvNvJuQuOVTIlsto9',
//        q: 'AOZ_UsRhtvHF9Ysbifz05wbNI-QCMbHhTAPOGmRbDVMp6PDZ-Qyi0O3InNeWYjnqgIPzMgwRwdHHnn-FV_aUbL0hXEqcfBlw5eHVuh9SBiOLjBgu0dwe5_1UpbJM8toFW_sLmD7_bBjZY-RHTWaBDYANIqW8H4JWOJvKxc6rZ0X9',
//        dp: 'E-viwXXtLXHW8IgNQCn1mUXiYgUWi0rACRCjADrJvR-E0lxLTFAtRafHKQPB6bovMY2Kv28hpYUq7m8H25Lb-Q4jGJ0ELPn-ShBzOyALVm77Weg-2T40DhzbDFSTvZdR9ZVO6M16oMPJdCSx9S3IYSBROSPQcbGQMgQT6k13oRE',
//        dq: 'XJC_XWxceuXkARRzKunzKZESm8uhx2zSCSkpAipqxH4tNSRkVwW_3-5TxmR3WAjryZHOBHjRHH0NEusq8zSSIrYWCUSktdbYCwS49UEMhBPTlBahYsPqqJro3Bz43kOOt9flMU-ESspqyk80LzkegdFEm8hb4wzbOP2KyL-e_sU',
//        qi: 'TjgbPWTo6zMAFs0c_gQEtSKcq49wbd0394NA7NoqbpWIWy11TSgQkVs7dP4Li0Id-3sptNwUOMeyJKPYNRjSXncW_Hmd3g7BoERy7gIcUL9wA26NFvryZBajdsKPKzKwofRQoUvQuiuxxs2uQe3Kq45FH892b7utq-rvMDkBpIs' } ] }
// key: JWKBaseKeyObject {
//   keystore: JWKStore {},
//   length: 2056,
//   kty: 'RSA',
//   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
//   use: '',
//   alg: '' }
// private key (secret) base64 encoded: { kty: 'RSA',
//   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
//   n: 'ANW7fav7qv0Dk-tcW7CRAMPsKyGiPWtOIoF9n0INpygN_fG9gHbTv08VgrOp_JQvoEaGdnA5Q1zlO6s5uidvM1NBztPFWVYLTS08YYTu0NP8yB1e7_J0a1rtHrIGfb5jEytoLxOQQUxRVo5yZrXr0vJXztRGUBU70RksroRjbAsrmM4ISZnUDn_joG0BfLPGL50IqonPAMAzfaEj_S53sNzMCCy_H3f7uT2xS9UlE32tvV_zBV9OifTwzsZlhWT26Wu46pPn2QItub4sg3brnFRD6668JuovyHjr5M0rO2pE5MnkZjSBJBulQdCJTkDb5TTZVlqbqF8iqfrniwQfH0k',
//   e: 'AQAB',
//   d: 'NpIJc0jtjm5EbTqGmp1bQariFFNVNTmc680ERZwwyrRP21IUI8LKvMl0NqU3PSqv1HHueZbVUTmiM4Sot_rXcvGBemaP-b0m9l7NU2CaZxXKjl04DIKXCn8ycCfiISMwuMuAAZG6al72J6aj_Nz6Xi_3OhG9zr4YFEJpSJoN8we2JRrwCkMHnfWOSW2cv8Cea8Iq58ce-2a-Cdmh65ervQbRicDhzH-G_To3QWGInUr5h93QC7qbKYHK4R7A8Xtz0ShF3qLGKATT_S6awhg3x4oKyWfRcgui2-as2E7SF2BBq14nht73JbAD4ww5-adDYzRzd6rbrSi5UFBmFMK40Q',
//   p: 'AO1hT7-c40x5mDiNZRtU-x-geQODSNCVeQJznznMtJecTAy2WWVCKxfhUWX6La8D8-LNvrITyRtQQ_AUZoVuwc-w4TjKapa42CjmvVO_gnFOdzKfaCUZYZLwmddlGZuasjfSCTieCreAYe2rA0CXz4q85dDxvNvJuQuOVTIlsto9',
//   q: 'AOZ_UsRhtvHF9Ysbifz05wbNI-QCMbHhTAPOGmRbDVMp6PDZ-Qyi0O3InNeWYjnqgIPzMgwRwdHHnn-FV_aUbL0hXEqcfBlw5eHVuh9SBiOLjBgu0dwe5_1UpbJM8toFW_sLmD7_bBjZY-RHTWaBDYANIqW8H4JWOJvKxc6rZ0X9',
//   dp: 'E-viwXXtLXHW8IgNQCn1mUXiYgUWi0rACRCjADrJvR-E0lxLTFAtRafHKQPB6bovMY2Kv28hpYUq7m8H25Lb-Q4jGJ0ELPn-ShBzOyALVm77Weg-2T40DhzbDFSTvZdR9ZVO6M16oMPJdCSx9S3IYSBROSPQcbGQMgQT6k13oRE',
//   dq: 'XJC_XWxceuXkARRzKunzKZESm8uhx2zSCSkpAipqxH4tNSRkVwW_3-5TxmR3WAjryZHOBHjRHH0NEusq8zSSIrYWCUSktdbYCwS49UEMhBPTlBahYsPqqJro3Bz43kOOt9flMU-ESspqyk80LzkegdFEm8hb4wzbOP2KyL-e_sU',
//   qi: 'TjgbPWTo6zMAFs0c_gQEtSKcq49wbd0394NA7NoqbpWIWy11TSgQkVs7dP4Li0Id-3sptNwUOMeyJKPYNRjSXncW_Hmd3g7BoERy7gIcUL9wA26NFvryZBajdsKPKzKwofRQoUvQuiuxxs2uQe3Kq45FH892b7utq-rvMDkBpIs' }
// key signed using: [ 'RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512' ]
// JWE token: eyJhbGciOiJSU0EtT0FFUCIsImtpZCI6InFGY194T3VaY0JGZFd4MWdRTFNsZFR4U1NnZFc2TDNSSEJjbmFNa2YtZmciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.clOfxXRuA7cSN6FCbh3VHBpsS-P8IGQ1XDRK-xfE4aBhLCdvqUi0KZELAWpfCTBMYoCgGkR1ndlNUUrOJo0dhGF6E59fT1smbvSBDeDlKJ_7kF6Xt34iVr5O4xmWDo3kqBEz0l96uV4BM3y3O1p4orQcuv_CyGzvSoBVsxWwfu5kBkAO1Buq45wRB1X_cHGpUkrAyYe0ORt5jqQb6K4KedMkb3cAHMdaGEDgEj9Z8IftBTHisux5xzvJPG3aRiF4z8PkOV_yehkCLFkYXENCPwWbmhDH8aUl9qSduU3IOoAY8aG9EVRBAzQP3brpaYr3Ur3RxYY2tyesZb7U53xSAQ.6Bkg8_rNuC3AItJwF1ejRA.iXMPa1pFMGLIEuNV6PmM7Uv6pnSuIhF6d0ZwGitcwq4pO5c2RLBwZ9B_y34wwBRjX9ebVBNUTYhnz8-TYbfNYFZaoZtMLglqNR0Y4wpUIzY.fhpSauiHNRjTUK9DeKZwbA
// token header: { alg: 'RSA-OAEP',
//   kid: 'qFc_xOuZcBFdWx1gQLSldTxSSgdW6L3RHBcnaMkf-fg',
//   enc: 'A128CBC-HS256' }
// token payload: {"sub":"4848","name":"El Bobbio is ME and I am encrypted!","role":"admin-io"}