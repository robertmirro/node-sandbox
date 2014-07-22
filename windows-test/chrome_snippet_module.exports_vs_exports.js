console.clear();

var module = {
    exports: {}
};

// if you require a module, it's basically wrapped in a function as follows:
(function( module , exports , useExports ) {
    if ( useExports ) {
        // WRONG: this results in: module.exports = {}
        exports = function( n ) {
            return n * 1000
        };
    } else {
        // CORRECT: 
        module.exports = function( n ) {
            return n * 2000
        };
    }
})( module , module.exports , false );

console.log( 'module.exports: %O' , module.exports ); 
