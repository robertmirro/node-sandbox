var fileList = require('./make_it_modular_module');

var dirToList = process.argv[2];
var fileExtensionFilter = process.argv[3];

fileList(dirToList, fileExtensionFilter, function( error, fileList ) {
    if (error) {
        return console.log('Directory does not exist. (' + dirToList + ')');
    }

    fileList.forEach( function( value, index, array ) {
        //console.log('file: ' + index, value, '\n', array);
        console.log(value); // display filename
    });
});

// OFFICIAL SOLUTION
//
//var filterFn = require('./solution_filter.js')
//var dir = process.argv[2]
//var filterStr = process.argv[3]
//
//filterFn(dir, filterStr, function (err, list) {
//    if (err)
//        return console.error('There was an error:', err)
//
//    list.forEach(function (file) {
//        console.log(file)
//    })
//})