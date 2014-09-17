//
// http://www.bennadel.com/blog/2683-eventemitter-invokes-event-callbacks-in-the-context-of-the-eventemitter-instance-in-node-js.htm
//

var events = require( "events" );
var util = require( "util" );

// I sub-class the EventEmitter.
function Session() {
 
    // Call the super constructor.
    events.EventEmitter.call( this );
 
    // Since this is a sub-class of the EventEmitter, we can pass in the raw method
    // reference without worrying about the binding. When EventEmitter invokes the
    // callback, it will call it in the context of THIS, which is the owner of the
    // method in question to begin with.
    this.on( "stop", this._destroy );
 
}

util.inherits( Session, events.EventEmitter );

// I tear-down the instance.
Session.prototype._destroy = function() {
 
    // NOTE: Since this method is being called as part of a .on() event binding,
    // this *should* be the current object instance.
    console.log( "Destroy: (this === session : %s)", ( this === session ) );
 
};

var session = new Session();
 
// When the stop event takes place, compare the execution context to our session
// instance. EventEmitter should invoke this in the context of the EventEmitter instance.
session.on(
    "stop",
    function handleStop() {
 
        console.log( "Stop: (this === session : %s)", ( this === session ) );
 
    }
);
 
// Trigger the event.
session.emit( "stop" );


// OUTPUT:
// Destroy: (this === session : true
// Stop: (this === session : true)