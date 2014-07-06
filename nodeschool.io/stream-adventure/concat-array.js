var concatStream = require('concat-stream');

var writeStream = concatStream( function( data ) {
   console.log('concat data:\n' + data.toString());
});

writeStream.write([ 1 , 3 , 5 ]);
writeStream.write([ 2 , 4 , 6 ]);
writeStream.end();

//writeStream.write('bob');
//writeStream.write(' ');
//writeStream.write('mirro\n');
//writeStream.end('the end.');

//writeStream.write(Buffer('This is a buffer from "write"\n'));
//writeStream.end(Buffer('This is a buffer from "end"\n'));


