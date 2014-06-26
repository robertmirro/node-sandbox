
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

var argTotal = 0;

//console.log('Command line arguments:\n', process.argv);
process.argv.forEach( function( value, index, array ) {
    //console.log(index + ": " + value);

    if (isNumber(value)) {
        argTotal += +value;
    }
});
console.log(argTotal);

// OFFICIAL SOLUTION
//
//var result = 0
//
//for (var i = 2; i < process.argv.length; i++)
//    result += Number(process.argv[i])
//
//console.log(result)