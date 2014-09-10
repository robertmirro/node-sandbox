var Combine = require('stream-combiner');
var es      = require('event-stream');

Combine(                                  // connect streams together with `pipe`
  process.openStdin(),                    // open stdin
  es.split(),                             // split stream to break on newlines
  es.map(function (data, callback) {      // turn this async function into a stream
    var repr = inspect(JSON.parse(data))  // render it nicely
    callback(null, repr)
  }),
  process.stdout                          // pipe it to stdout !
);

// the single example listed for this package fails to run due to stdout.  nice.
//
// $ node stream-combiner-example.js
//
// events.js:72
//         throw er; // Unhandled 'error' event
//               ^
// Error: read ENOTCONN
//     at errnoException (net.js:904:11)
//     at WriteStream.Socket._read (net.js:390:21)
//     at WriteStream.Readable.read (_stream_readable.js:340:10)
//     at WriteStream.Socket.read (net.js:296:15)
//     at WriteStream.<anonymous> (_stream_readable.js:763:45)
//     at WriteStream.emit (events.js:92:17)
//     at emitDataEvents (_stream_readable.js:789:10)
//     at WriteStream.Readable.on (_stream_readable.js:710:5)
//     at proxyStream (c:\Dev\GitRepos\node-sandbox\nodeschool.io\stream-adventure\
// node_modules\duplexer\index.js:65:16)
//     at Array.forEach (native)