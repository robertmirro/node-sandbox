var through = require('through');

//accept data from stdin, transform it to UPPERCASE via our "through" stream and then pipe output to stdout
var tr = through( function writeData( data ) {
//        console.log('writing...');
//        this.emit( 'data' , data.toString().toUpperCase() );
        this.queue( data.toString().toUpperCase() );
    },
    function endData () {
//        console.log('ending...');
//        this.emit( 'end' );
        this.queue( null );
    });

// take data entered from stdin, pipe it to the "through" stream to be processed and then pipe it to stdout stream
process.stdin.pipe(tr).pipe(process.stdout);

// CAN TEST AS FOLLOWS:
//1
//$ echo -e 'bob\nmirro\nis\nme' | node transform.js
//BOB
//MIRRO
//IS
//ME
// --OR--
//2
//node transform.js
//[type characters and press <enter> after each line]
//bob
//BOB
//mirro
//MIRRO
//is
//IS
//me
//ME


// accept data from stdin, tranform it to UPPERCASE and then output using stdout
//var tr = through( function writeData( data ) {
//        //console.log('writing...');
//        process.stdout.write(data.toString().toUpperCase());
//    },
//    function endData () {
//        console.log('ending...');
//    });
//
//// take data entered from stdin and pipe it to the "through" stream to be processed
//process.stdin.pipe(tr);


//// manually invoke write/end callbacks on through stream
//var tr = through(writeMe, endMe);
//tr.write('beep\n');
//tr.write('boop\n');
//tr.end();
//
//function writeMe (buf) { console.dir(buf) }
//function endMe () { console.log('__END__') }

// OFFICIAL SOLUTION
//
//var through = require('through');
//var tr = through(function (buf) {
//    this.queue(buf.toString().toUpperCase());
//});
//process.stdin.pipe(tr).pipe(process.stdout);