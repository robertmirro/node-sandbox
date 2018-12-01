//
// https://github.com/ariya/esprima
//
// https://esprima.readthedocs.io/en/4.0/getting-started.html
//
const { parseScript, Syntax } = require('esprima');
const { generate } = require('escodegen');
const fs = require('fs');

const config = fs.readFileSync('./eh-config.js', 'utf8');
const ast = parseScript(config, {}, node => {
    if (node.type === Syntax.CallExpression && node.callee.name === 'vsts' && !/^__\w*__$/.test(node.arguments[0].value)) {
        node.arguments[1] = {
            type: Syntax.Identifier,
            name: 'undefined'
        };
    }
});

fs.writeFileSync('./eh-config-parsed.js', generate(ast));