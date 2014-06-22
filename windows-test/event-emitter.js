var EventEmitter = require('events').EventEmitter;
var util = require('util');

function MyClass() {
    if (!(this instanceof MyClass)) return new MyClass();

    EventEmitter.call(this);

    var self = this;
    setTimeout(function timeoutCb() {
        self.emit('myEvent', 'hello world', 42);
    }, 1000);
}
util.inherits(MyClass, EventEmitter);

var myObj = new MyClass();
var start = Date.now();
myObj.on('myEvent', function myEventCb(str, num) {
    console.log('myEvent triggered', str, num, Date.now() - start);
});

