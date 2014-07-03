var util = require('util');

var myObject = {
    name: 'Robert',
    type: 'webdev',
    version: '1.0',
    getName: function( ) {
        return this.name;
    },
    setName: function( name ) {
        this.name = name;
    },
    tools: ['.net' , 'js' , 'node' , 'angular']
};

console.log( myObject );
console.log();
console.log(util.inspect( myObject ));
console.log();
console.log(util.inspect( myObject , {showHidden: true, depth: null, colors: true} ));
console.log();

util.print('[util print] does NOT output newline here -->');
util.puts('[util puts] DOES output newline here -->');
util.log('[util log] with timestamp...');
util.debug('[util debug]...');