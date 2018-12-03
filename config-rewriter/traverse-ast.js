(() => {
    'use strict';
    console.clear();

    const ast = parsedAst();
    // console.log(ast);

    const traverse = ast => {
        if (!ast) return;

        if (Array.isArray(ast)) {
            ast.forEach(ast => { traverse(ast); });
            return;
        }

        if (ast.type) console.log('type:', ast.type);

        if (ast.type === 'Program') return traverse(ast.body);
        if (ast.type === 'VariableDeclaration') return traverse(ast.declarations);
        if (ast.type === 'VariableDeclarator' && ast.id.name === 'config') return traverse(ast.init.properties);
        if (ast.type === 'Property' && ast.value.type === 'CallExpression' && ast.value.callee.name === 'vsts') {
            console.log('arguments:', ast.value.arguments);

            if (!/^__\w*__$/.test(ast.value.arguments[0].value)) {
                console.log('CLEANSING...');
                ast.value.arguments[1].value = {
                    type: 'Identifier',
                    name: 'undefined'
                };
            }
        }
    };
    traverse(ast);

    console.log('ast result:', ast);

    // if ast=object, return collection based on type?
    //      if 'Program', return ast.body

    // if ast=array,

    // '__THE_URL__'
    // '____'
    // 'SomeValue'



    function parsedAst() {
        return {
            "type": "Program",
            "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "vsts"
                        },
                        "init": {
                            "type": "ArrowFunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        }
                    }],
                    "kind": "const"
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "blah"
                        },
                        "init": null
                    }],
                    "kind": "let"
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "blah2"
                        },
                        "init": {
                            "type": "Literal",
                            "value": "BLAH2",
                            "raw": "'BLAH2'"
                        }
                    }],
                    "kind": "let"
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "config"
                        },
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [{
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "appId"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 4848,
                                        "raw": "4848"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "theUrl"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "vsts"
                                        },
                                        "arguments": [{
                                                "type": "Literal",
                                                "value": "__THE_URL__",
                                                "raw": "'__THE_URL__'"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": "https:\\eh.com:44",
                                                "raw": "'https:\\\\eh.com:44'"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "undefined"
                                            }
                                        ]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "otherUrl"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "vsts"
                                        },
                                        "arguments": [{
                                                "type": "Literal",
                                                "value": "https:\\eh.prod.com:443other",
                                                "raw": "'https:\\\\eh.prod.com:443\\other'"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": "https:\\eh.com:44other",
                                                "raw": "'https:\\\\eh.com:44\\other'"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "undefined"
                                            }
                                        ]
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }],
                    "kind": "const"
                },
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "noop"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                                "type": "VariableDeclaration",
                                "declarations": [{
                                    "type": "VariableDeclarator",
                                    "id": {
                                        "type": "Identifier",
                                        "name": "dummy"
                                    },
                                    "init": {
                                        "type": "ArrayExpression",
                                        "elements": [{
                                                "type": "Literal",
                                                "value": 1,
                                                "raw": "1"
                                            },
                                            {
                                                "type": "Literal",
                                                "value": 2,
                                                "raw": "2"
                                            },
                                            {
                                                "type": "ObjectExpression",
                                                "properties": [{
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "id"
                                                    },
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": 3,
                                                        "raw": "3"
                                                    },
                                                    "kind": "init",
                                                    "method": false,
                                                    "shorthand": false
                                                }]
                                            }
                                        ]
                                    }
                                }],
                                "kind": "const"
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "Literal",
                                    "value": null,
                                    "raw": "null"
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        };
    }

})();