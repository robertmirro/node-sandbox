var EventEmitter = require('events').EventEmitter;
var util = require('util');

function MyClass() {
    console.log(this instanceof MyClass);
    if (!(this instanceof MyClass)) return new MyClass();

    EventEmitter.call(this);

    var self = this;
    //setTimeout(function timeoutCb() {
    setTimeout(function () {
        self.emit('myEvent', 'hello world', 44, 84);
    }, 1000);
}
util.inherits(MyClass, EventEmitter);

var myObj = new MyClass();
var start = Date.now();
myObj.on('myEvent', function myEventCb(str, num, num2) {
    console.log('myEvent triggered: ', str, num, num2, Date.now() - start);
});

