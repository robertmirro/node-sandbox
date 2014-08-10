console.log('\n------ global-var ------');
console.log( 'typeof MyGlobal:' , typeof MyGlobal);

require('./global_var_defined');

console.log('\n------ global-var ------');
console.log( 'typeof MyGlobal:' , typeof MyGlobal);
console.log( 'MyGlobal.Calc.add( 3 , 1 ) =' , MyGlobal.Calc.add( 3 , 1 ) );
