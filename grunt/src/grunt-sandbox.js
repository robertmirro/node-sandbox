var uniq = require('uniq');

var arrayDups = [ 1 , 2 , 2 , 3 , 4 , 5 , 5 , 5 , 7 , 7 , 8 ];
var arrayUniq = arrayDups.slice( 0 );

// chrome console does not display correct output if console is opened AFTER html is rendered AND "uniq( arrayUniq )" is NOT used
// if using "uniq( arrayDups )" below, open console BEFORE rendering html OR re-render html after console is opened
console.log( 'duplicate array data: ' , arrayDups );
console.log( 'unique array data: ' , uniq( /* arrayUniq */ arrayDups ) );

// output
//
//duplicate array data:  [1, 2, 2, 3, 4, 5, 5, 5, 7, 7, 8]
//unique array data:  [1, 2, 3, 4, 5, 7, 8]