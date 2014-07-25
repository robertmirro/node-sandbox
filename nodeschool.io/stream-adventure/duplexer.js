var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

//var ls = spawn( 'ls' , [ '-l' , '-a'] );
//ls.stdout.on( 'data' , function( data ) {
////    console.log( 'ls.stdout:\n' );
//    // write output to console without newlines being appended
//    process.stdout.write( data.toString() );
//});
//ls.on( 'close' , function( exitCode ) {
//    console.log( '\n\nls.close - exitCode:' , exitCode );
//});

module.exports = function( command , args  ) {
    var spawnedProcess = spawn( command, args );
    return duplexer( spawnedProcess.stdin , spawnedProcess.stdout );
};