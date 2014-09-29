var fs = require('fs'),
    path = require('path');


module.exports = function scan( dir , alias ){
    return {
        name: alias,
        type: 'folder',
        path: alias,
        items: walk( dir , alias )
    };
};

function walk( dir , prefix ){
    prefix = prefix || '';

    if( !fs.existsSync( dir ) ){
        return [];
    }

    return fs.readdirSync( dir ).filter( function( f ){

        return f && f[0] != '.'; // Ignore hidden files

    }).map( function( f ){

        var p = path.join( dir , f ),  // fix path issues on windows, 
            stat = fs.statSync( p );

            fixPath( path.join( prefix , p ) );

        if( stat.isDirectory() ){
            return {
                name: f,
                type: 'folder',
                path: fixPath( path.join( prefix , p ) ),
                items: walk( p , prefix )
            };
        }

        return {
            name: f,
            type: 'file',
            path: fixPath( path.join( prefix , p ) ),
            size: stat.size
        }
    });
};

// fix path issues on windows: need %2F in location #hash string, NOT %5C
function fixPath( path ) {
    return path.replace( /\\/g , '/' );
}