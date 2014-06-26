var fs = require('fs');

var fileToRead = process.argv[2];
var fileContents = '';
var fileEndsWithNewline = false;

//console.log('File to read: ', fileToRead);

try {
    fileContents = fs.readFileSync(fileToRead).toString();
    //console.log(fileContents);
    //console.log(fileContents.length);

    fileEndsWithNewline = (fileContents.substring(fileContents.length - 1) == '\n');
    //console.log('fileEndsWithNewline:', fileEndsWithNewline);
} catch (e) {
    console.log('File does not exist. (' + fileToRead + ')')
    return;
}

// count number of newline chars (array will have 1 more element than the total of newlines)
console.log(fileContents.split('\n' ).length -  1);

// OFFICIAL SOLUTION
//
//var fs = require('fs')
//
//var contents = fs.readFileSync(process.argv[2])
//var lines = contents.toString().split('\n').length - 1
//console.log(lines)
//
// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1