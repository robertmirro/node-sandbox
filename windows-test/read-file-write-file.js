var fs = require('fs'),
    util = require('util');

fs.readFile('input-file.txt', function( error, fileContent ) {
    util.puts('Input file has been read...');
    //console.log('Input file contents:\n', fileContent.toString() );

    fs. writeFile('output-file.txt', 'My output file...\n\n' + fileContent, function() {
        util.puts('Output file has been written...');
    });
});


console.log('Done...');
