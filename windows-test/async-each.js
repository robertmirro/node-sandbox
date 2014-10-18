var each = require('async-each')
    fs = require('fs');


each( [ 'async-each-1.js' , 'async-each-2.js' , 'async-each-2.js' ] , fs.readFile , function( err , dataArray ) {
    if ( err ) {
        console.error( err );
        return;
    }

    for (var i = 0; i < dataArray.length; i++ ) {
        console.log( '\nData Array [%s]:\n%s' , i , dataArray[ i ].toString() );
    }
});