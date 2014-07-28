
// consume read stream manually
process.stdin.on( 'readable' , function(  ) {
    var data = process.stdin.read();

    // dont log initial null value of buffer
    if ( data ) {
        console.log( '\ndata: %s' , data.toString() );
        console.dir ( data );
        console.log('');
    }
});

//$ (echo bob; sleep 1; echo mirro; sleep 1; echo is me) | node readable_stream_consume_manually.js
//
//data: bob
//
//<Buffer 62 6f 62 0a>
//
//
//data: mirro
//
//<Buffer 6d 69 72 72 6f 0a>
//
//
//data: is me
//
//<Buffer 69 73 20 6d 65 0a>