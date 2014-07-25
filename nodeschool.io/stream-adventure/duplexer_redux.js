var duplexer = require('duplexer');
var through = require('through');

module.exports = function( counterStream ) {
    var countryCount = {};

    var tr = through( function writeData( data ) {
//            console.log(data.country , countryCount[data.country] , countryCount[data.country] == undefined)
            if ( countryCount[data.country] === undefined ) {
                countryCount[data.country] = 0;
            }
            countryCount[data.country] += 1;
        } ,
        function endData() {
//            console.log( countryCount );
            counterStream.setCounts( countryCount );
        }
    );

    return duplexer( tr , counterStream );
};


// OFFICIAL SOLUTION
//
//module.exports = function (counter) {
//    var counts = {};
//    var input = through(write, end);
//    return duplexer(input, counter);
//
//    function write (row) {
//        counts[row.country] = (counts[row.country] || 0) + 1;
//    }
//    function end () { counter.setCounts(counts) }
//};
