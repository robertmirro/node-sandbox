var nameTemplate = require('./templates/name.html');
var $ = require('jquery');

// expose globally
window.nameTemplate = nameTemplate;

$( function() {
    // console.log( '#nameExample: ' , $( '#nameExample') );
    $( '#nameExample' ).html( nameTemplate( {
        templateBodyItem : '<Name Example>' ,
        templateBodyFooter : new Date()                                    
    }));
    $( '#nameExample .templateBodyItem').addClass( 'templateBodyItemColor' ).css( 'margin-top' , '10px' ).show();
});
