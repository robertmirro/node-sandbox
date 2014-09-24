var fs = require('fs') ,
    path = require('path') ,
    async = require('async');

fs.readdir( __dirname , function( err , files ) {
    if ( err ) {
        throw err;
    }

    // console.log( files );
    files.forEach( function( file , index , array ) {
        if ( index === 0 ) {
            console.log( '\nDirectory Listing - forEach (total: %s):\n%s\n' , files.length, __dirname );
        }

        fs.stat( path.join( __dirname ,  file ) , function( err , stats) {
            console.log( 
                ' %s - %s %s' , 
                stats.isFile() ? 'F' : 'D' , 
                file ,
                stats.isFile() ? '[' + stats.size + ' bytes]' : ''
            );
        });
    });


    function getFileStats( file , cb ) {
        fs.stat( file , function( err , stats ) {
            cb( err , { 'file' : file , 'stats' : stats } );
        });
    }

    async.map( files , getFileStats /* fs.stat */ , function( err , fileStats ) {
        console.log( '\nDirectory Listing - async.map (total: %s):\n%s\n' , files.length, __dirname );
        
        // console.log( fileStats[0] );

        fileStats.forEach( function( stat , index , array ) {
            console.log( 
                ' %s - %s %s' , 
                stat.stats.isFile() ? 'F' : 'D' , 
                stat.file ,
                stat.stats.isFile() ? '[' + stat.stats.size + ' bytes]' : ''
            );
        });
    });

});   