//
// https://github.com/ariya/esprima
//
// https://esprima.readthedocs.io/en/4.0/getting-started.html
//
const { parseScript, Syntax } = require('esprima');
const fs = require('fs');

let config = fs.readFileSync('./eh-config.js', 'utf8');
const parseOptions = {
    range: true,
    loc: true
};
const cleanseArgs = [];

parseScript(config, parseOptions, (node, meta) => {
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
fs.writeFileSync('./eh-config-parsed.js', config);