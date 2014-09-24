var fs = require('fs') ,
    path = require('path');

fs.readdir( __dirname , function( err , files ) {
    if ( err ) {
        throw err;
    }

    console.log( '\nDirectory Listing (total: %s):\n%s\n' , files.length, __dirname );

    // console.log( files );
    files.forEach( function( file , index , array ) {
        fs.stat( path.join( __dirname ,  file ) , function( err , stats) {
            console.log( 
                ' %s - %s %s' , 
                stats.isFile() ? 'F' : 'D' , 
                file ,
                stats.isFile() ? '[' + stats.size + ' bytes]' : ''
            );
        });
    });
});   