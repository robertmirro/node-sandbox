;(function () {
    var list = [ 
        'html5' , 
        'css3' , 
        'js' , 
        'sass' , 
        'less' , 
        'node' , 
        'express' , 
        'jade' , 
        'handlebars' , 
        'mongodb' , 
        'postgresql' , 
        'angular' , 
        'ember' , 
        'backbone' , 
        'grunt' , 
        'gulp' , 
        'git' , 
        'svn' 
    ];    
    
    function getList() {
        // number of concurrent items to select, min of 1, max of 6
        var itemsToSelect = Math.ceil( Math.random() * 6 );  
//         console.log( 'itemsToSelect:' , itemsToSelect );
        
        // start at a point in the list where all itemsToSelect are guaranteed to be selected        
        var startAt = Math.floor( Math.random() * ( list.length - itemsToSelect ) );
//         console.log( 'startAt:' , startAt );
        
        for ( var itemNum = startAt, stopAt = startAt + itemsToSelect; itemNum < stopAt; itemNum++ ) {
            console.log( '%s - %s' , itemNum , list[ itemNum ] );
        }
    }
    
    console.log( list );
    getList();
    
})();
