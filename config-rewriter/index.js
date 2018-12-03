//
// https://github.com/ariya/esprima
//
// https://esprima.readthedocs.io/en/4.0/getting-started.html
//
const esprima = require('esprima');
const escodegen = require('escodegen');
const fs = require('fs');

// const parse = esprima.parseScript('const answer = 42');

const config = fs.readFileSync('./eh-config.js', 'utf8');
// const ast = esprima.parseScript(config, { range: true });
const ast = esprima.parseScript(config);

console.log('ast:', ast);

const traverse = ast => {
    if (!ast) return;

    if (Array.isArray(ast)) {
        ast.forEach(ast => { traverse(ast); });
        return;
    }

    // if (ast.type) console.log('type:', ast.type);
    if (ast.type === 'Program') return traverse(ast.body);
    if (ast.type === 'VariableDeclaration') return traverse(ast.declarations);
    if (ast.type === 'VariableDeclarator' && ast.id.name === 'config') return traverse(ast.init.properties);
    if (ast.type === 'Property' && ast.value.type === 'CallExpression' && ast.value.callee.name === 'vsts') {
        // console.log('arguments:', ast.value.arguments);

        if (!/^__\w*__$/.test(ast.value.arguments[0].value)) {
            // console.log('CLEANSING...');
            ast.value.arguments[1] = esprima.parseScript(undefined);
            // ast.value.arguments[1] = {
            //     type: 'Identifier',
            //     name: 'undefined'
            // };
        }
    }
};
traverse(ast);

fs.writeFileSync('./eh-config-parsed.js', escodegen.generate(ast));