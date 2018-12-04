//
// https://github.com/ariya/esprima
//
// https://esprima.readthedocs.io/en/4.0/getting-started.html
//
const { parseScript, Syntax } = require('esprima');
const fs = require('fs');

const parseOptions = {
    range: true,
    loc: true
};
const cleanseArgs = [];
const configFile = './eh-config.js';
let config = fs.readFileSync(configFile, 'utf8');

parseScript(config, parseOptions, node => {
    if (node.type === Syntax.CallExpression && node.callee.name === 'vsts' && !/^__\w*__$/.test(node.arguments[0].value)) {
        const [start, end] = node.arguments[1].range;
        cleanseArgs.push({
            start,
            end
        });
    }
});

cleanseArgs
    .reverse()
    .forEach(arg => {
        config = `${config.substring(0, arg.start)}undefined${config.substring(arg.end)}`;
    });
fs.writeFileSync(configFile, config);