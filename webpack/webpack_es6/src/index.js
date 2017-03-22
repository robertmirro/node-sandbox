// npm run build

const line = () => console.log('-'.repeat(80));

console.log(`index.js...`);
line();

import defaultMethod, { serviceCall, options, methodOne, mTwo as methodTwo } from './service';

import * as otherService from './otherService';
import { default as otherDefaultMethod } from './otherService';

import * as passThroughAll from './passThroughAll';
import passThroughDefault, * as passThrough from './passThroughAll';

import defaultMethodPassByName, { serviceCall as sCall, _options, methodOne as m1, methodTWO, theVar as _theVar } from './passThroughByName';

// method.theMethod = unexpected token error, this is not allowed
// let method = {};
// import { methodTWO as method.theMethod } from './passThroughByName';

import defaultYetAnotherService, { var1, varThree, var4 as four, var5 as fiveVar, CONST1 as CONSTANT_ONE, CONST2 } from './yetAnotherService';

import { controller } from './component';

defaultMethod('d to the fault');
serviceCall('the params');
console.log('service options:', options);
methodOne('one');
methodTwo('two');
line();

console.log('otherService:', otherService);
otherService.default('d to the fault');
otherDefaultMethod('other d to the fault');
otherService.serviceCall('the other params');
console.log('other service options:', otherService.options);
console.log('other service theVar:', otherService.theVar);
otherService.methodOne('other one');
otherService.mTwo('other two');
line();

console.log('passThroughAll:', passThroughAll);
passThroughAll.default('passThroughAll d to the d to the fault');
passThroughAll.serviceCall('passThroughAll the other params');
console.log('passThroughAll other service options:', passThroughAll.options);
passThroughAll.methodOne('passThroughAll other one');
passThroughAll.mTwo('passThroughAll other two');
line();

console.log('passThrough:', passThrough);
passThroughDefault('passThroughDefault d to the d to the d to the fault');
passThrough.serviceCall('passThrough the other params');
console.log('passThrough other service options:', passThrough.options);
passThrough.methodOne('passThrough other one');
passThrough.mTwo('passThrough other two');
line();

defaultMethodPassByName('passThroughByName d to the fault');
sCall('passThroughByName the other params');
console.log('passThroughByName other service options:', _options);
console.log('passThroughByName other service theVar:', _theVar);
otherService.theVar = 'uh oh, new value assigned... will it be reflected below?';
console.log('passThroughByName other service theVar again:', _theVar);
m1('passThroughByName other one');
methodTWO('passThroughByName other two');
line();

console.log('defaultYetAnotherService:', defaultYetAnotherService);
console.log('var1:', var1);
console.log('varThree:', varThree);
console.log('four:', four);
console.log('fiveVar:', fiveVar);
console.log('CONSTANT_ONE:', CONSTANT_ONE);
console.log('CONST2:', CONST2);
let { name, value: theValue } = CONST2;
console.log('name:', name);
console.log('theValue:', theValue);
line();

controller('the ctrl');
line();
