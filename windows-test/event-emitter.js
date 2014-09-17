var EventEmitter = require('events').EventEmitter;
var util = require('util');

function MyClass() {
    console.log( 'this instanceof MyClass:' , this instanceof MyClass );
    if (!(this instanceof MyClass)) return new MyClass();

    console.log( 'MyClass.super_ === EventEmitter:' , MyClass.super_ === EventEmitter );

    // EventEmitter.call(this);
    MyClass.super_.call( this );

    var self = this;
    setTimeout(function () {
        self.emit('myEvent', 'hello world', 44, 84);
    }, 1000);

    setTimeout(function () {
        this.emit('myEvent', 'hello again world', 4, 8);
    }.bind( this ), 2000);
}
util.inherits(MyClass, EventEmitter);

var start = Date.now();

var myObj = new MyClass();
myObj.on('myEvent', function myEventCb(str, num, num2) {
    console.log('myEvent triggered:', str, num, num2, Date.now() - start);
});

