var uniq = require('uniq');

var arrayDups = [ 1 , 2 , 2 , 3 , 4 , 5 , 5 , 5 , 7 , 7 , 8 ];
var arrayUniq = arrayDups.slice();

console.log( 'duplicate array data: ' , arrayDups );
console.log( 'unique array data: ' , uniq( arrayUniq ) );