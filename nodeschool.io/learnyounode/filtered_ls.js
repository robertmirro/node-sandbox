var fs = require('fs');
var path = require('path');

var dirToList = process.argv[2];
var fileExtensionFilter = process.argv[3];

//console.log('Directory to list:', dirToList);
//console.log('File extension filter:', fileExtensionFilter);

fs.readdir(dirToList, function( error, files ) {
    if (error) {
        console.log('Directory does not exist. (' + dirToList + ')');
        //console.log('Error:', error);
        return;
    }

    //console.log('files:', files);

    for (var i = 0; i < files.length; i++) {
        //console.log(files[i]);
        if (path.extname(files[i]) == '.' + fileExtensionFilter) {
            console.log(files[i]);
        }
    }
});

// OFFICIAL SOLUTION
//
//var fs = require('fs')
//var path = require('path')
//
//fs.readdir(process.argv[2], function (err, list) {
//    list.forEach(function (file) {
//        if (path.extname(file) === '.' + process.argv[3])
//            console.log(file)
//    })
//})