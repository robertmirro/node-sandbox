var trumpet = require('trumpet');
var tr = trumpet();

tr.pipe( process.stdout );

var ws = tr.select( 'tbody' ).createWriteStream();
ws.end( '<tr><td>INSERTED TABLE ROW</td></tr>' );

process.stdin.pipe( tr );


//this:
//
//<table><tbody>blah blah blah</tbody><tr><td>there</td></tr><tr><td>it</td></tr><tr><td>is</td></tr></table>
//
//becomes:
//
//<table><tbody><tr><td>INSERTED TABLE ROW</td></tr></tbody><tr><td>there</td></tr><tr><td>it</td></tr><tr><td>is</td></tr></table>