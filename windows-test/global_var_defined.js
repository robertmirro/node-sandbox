console.log('\n------ global-var-defined ------');
console.log( 'typeof MyGlobal:' , typeof MyGlobal);

// variable declared without 'var' keyword is a node global var
MyGlobal ={};

// can also create a node global var by adding it as a property of the "global" object
//global.MyGlobal = {};
//
// or
//
// "GLOBAL" is an alias for "global"
//GLOBAL.MyGlobal = {};

MyGlobal.Calc = (function () {
    "use strict";

    var add = function ( num1 , num2 ) {
        return parseInt( num1 ) + parseInt( num2 );
    };

    return {
        add: add
    };
})();

console.log( 'typeof MyGlobal:' , typeof MyGlobal);
console.log( 'MyGlobal.Calc.add( 4 , 8 ) =' , MyGlobal.Calc.add( 4 , 8 ) );

