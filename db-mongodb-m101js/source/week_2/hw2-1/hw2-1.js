(function () {
    'use strict';

    var total = 0;
    var projection = { State : 1 , Temperature : 1 };

    // from shell: db.data.find( { "Wind Direction" : { $gte : 180 , $lte : 360 } } ).sort( {Temperature : 1 } ).limit(1).pretty()

    db.data.find( { "Wind Direction" : { $gte : 180 , $lte : 360 } } , projection )
        .sort( { Temperature : 1 } )
        .limit( 1 )
        .forEach( function( doc ) { 
            ++total; 
            printjson( doc ); 
        }
    );
    // print( "total:" + total);
})();
