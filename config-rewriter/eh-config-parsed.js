const vsts = () => {};
//const config = module.exports = {

let blah;
let blah2 = 'BLAH2';

const type = {
    string: null,
    number: null,
    boolean: null
};

const config = {
    appId: 4848,
    theUrl: vsts('__THE_URL__', 'https:\\eh.com:44', undefined),
    otherUrl: vsts('https:\\eh.prod.com:443\other', undefined, undefined),
    serverPort: vsts('__SERVER_PORT__', 8080, type.number),
    serverOtherPort: vsts('443', undefined, type.number),
    useFeature: vsts('__USE_FEATURE__', true, type.boolean),
    useOtherFeature: vsts('false', undefined, type.boolean),
};

function noop() {
    const dummy = [1, 2, { id: 3 }];
    return null;
}