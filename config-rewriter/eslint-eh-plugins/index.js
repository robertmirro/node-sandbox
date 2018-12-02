module.exports = {
    rules: {
        'no-template-literals': {
            create: function(context) {
                return {
                    TemplateLiteral(node) {
                        context.report(node, 'Do not use template literals');
                    }
                };
            }
        },
        'cleanse-config': {
            create: function(context) {
                return {
                    CallExpression(node) {
                        const [azureArg = {}, defaultArg = {}] = node.arguments;
                        if (node.callee.name === 'vsts' &&
                            !/^__\w*__$/.test(azureArg.value) &&
                            !(defaultArg.type === 'Identifier' && defaultArg.name === 'undefined') // null should also be handled
                        ) {
                            context.report(node, 'cleanse config required -> ' + node.arguments[0].value);
                        }
                    }
                };
            }
        }
    }
};

// parseScript(config, parseOptions, (node, meta) => {
//     if (node.type === Syntax.CallExpression && node.callee.name === 'vsts' && !/^__\w*__$/.test(node.arguments[0].value)) {
//         const [start, end] = node.arguments[1].range;
//         cleanseArgs.push({
//             start,
//             end
//         });
//     }
// });