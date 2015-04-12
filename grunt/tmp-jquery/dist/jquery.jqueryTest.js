/*! jQuery Test - v0.1.0 - 2014-11-05
* https://github.com/robertmirro/node-sandbox
* Copyright (c) 2014 robertmirro; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.jqueryTest = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.jqueryTest = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jqueryTest.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.jqueryTest.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jqueryTest = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));

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
