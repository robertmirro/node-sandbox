var fs = require('fs');
var path = require('path');

module.exports = function( dirToList, fileExtensionFilter, cb ) {
    var fileList = [];

//    console.log('Directory to list:', dirToList);
//    console.log('File extension filter:', fileExtensionFilter);

    fs.readdir(dirToList, function( error, files ) {
        if (error) {
            //console.log(error);
            return cb( error );  // only pass error to cb
        }

        //console.log('files:', files);

        for (var i = 0; i < files.length; i++) {
            //console.log(files[i]);
            if (path.extname(files[i]) === '.' + fileExtensionFilter) {
                //console.log(files[i]);
                fileList.push(files[i]);
            }
        }

        cb( null , fileList ); // pass null value as "error" to cb
    });
};

// OFFICIAL SOLUTION
//
//var fs = require('fs')
//var path = require('path')
//
//module.exports = function (dir, filterStr, callback) {
//
//    fs.readdir(dir, function (err, list) {
//        if (err)
//            return callback(err)
//
//        list = list.filter(function (file) {
//            return path.extname(file) === '.' + filterStr
//        })
//
//        callback(null, list)
//    })
//}