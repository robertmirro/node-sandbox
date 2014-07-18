console.log( 'INITIAL log message before process.nextTick()' );

function writeLog( message ) {
    console.log( message );
}

// defer this callback from firing until this entire stack completes
// the entire stack is complete when:
//   - the function that invoked process.nextTick() returns
//   - the parent of that function returns
//   - this continues all the way to the root of the stack
// process.nextTick() will then execute first in the event loop on top of an entirely new stack
process.nextTick( function() {
    console.log( 'process.nextTick() log message has fired'.toUpperCase() );
});

console.log( 'FIRST log message after process.nextTick()' );

(function() {
    console.log( 'SECOND log message after process.nextTick()' );
})();

writeLog( 'THIRD log message after process.nextTick()' );

// Output:
//
//INITIAL log message before process.nextTick()
//FIRST log message after process.nextTick()
//SECOND log message after process.nextTick()
//THIRD log message after process.nextTick()
//PROCESS.NEXTTICK() LOG MESSAGE HAS FIRED