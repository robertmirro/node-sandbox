var fs = require('fs');

var fileToRead = process.argv[2];
var fileEndsWithNewline = false;

//console.log('File to read: ', fileToRead);

//fs.readFile(fileToRead, function( error, fileContent ) {
fs.readFile(fileToRead, 'utf8', function( error, fileContent ) {
    if (error) {
        console.log('File does not exist. (' + fileToRead + ')');
        //console.log('Error:', error);
        return;
    }

    // if 'utf8' encoding param is used below, toString() is not needed on fileContent but can still be used without side effects
    //console.log(fileContent.toString());
    //console.log(fileContent);

    // count number of newline chars (array will have 1 more element than the total of newlines)
    console.log(fileContent.toString().split('\n' ).length -  1);
});

// OFFICIAL SOLUTION
//
//var fs = require('fs')
//var file = process.argv[2]
//
//fs.readFile(file, function (err, contents) {
//    // fs.readFile(file, 'utf8', callback) can also be used
//    var lines = contents.toString().split('\n').length - 1
//    console.log(lines)
//})