var combine = require('stream-combiner');
var through = require('through');
var split = require('split');
var zlib = require('zlib');

var fs = require('fs');
var gzipFile = fs.createWriteStream('combiner.data.gz');

// var books = require('./books.json')

// console.log( 'BOOKS:', books );

module.exports = function () {
    var grouper = through(write, end);
    var current;
    
    function write (line) {
        if (line.length === 0) return;
        var row = JSON.parse(line);

        // console.log( 'ROW:' , row );
        
        if (row.type === 'genre') {
            if (current) {
                // console.log( 'WRITE:' , JSON.stringify(current) );
                this.queue(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] };
        }
        else if (row.type === 'book') {
            current.books.push(row.name);
        }
    }
    function end () {
        if (current) {
            // console.log( 'END:' , JSON.stringify(current));
            this.queue(JSON.stringify(current) + '\n');
        }
        this.queue(null);
    }
    
    return combine( split() , grouper , zlib.createGzip() /* , gzipFile */ );
};

// var pipe = module.exports();
// pipe.write( '{ "type" : "genre" , "name" : "cyberpunk" }\n{ "type" : "book" , "name": "Neuromancer","genre": "cyberpunk" }\n{ "type" : "book" , "name": "Snow Crash", "genre": "cyberpunk" }\n{ "type" : "book" , "name": "Accelerando", "genre": "cyberpunk" }\n{ "type" : "genre" , "name" : "new wave" }\n{ "type" : "book" , "name": "The Heat Death of the Universe", "genre": "new wave" }\n{ "type" : "book" , "name": "Bug Jack Barron", "genre": "new wave" }\n{ "type" : "book" , "name": "Dangerous Visions", "genre": "new wave" }\n{ "type" : "genre" , "name" : "time travel" }\n{ "type" : "book" , "name": "A Connecticut Yankee in King Arthur\'s Court", "genre": "time travel" }\n{ "type" : "book" , "name": "The Time Machine", "genre": "time travel" }' );
// pipe.end();

