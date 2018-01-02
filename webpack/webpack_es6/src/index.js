// npm run build:dev

// import fp from 'lodash/fp';

// console.log('fp: %O', fp);

// const users = [
//     {
//         name: 'Ac',
//         age: 48
//     },
//     {
//         name: 'B',
//         age: 34
//     },
//     {
//         name: 'b',
//         age: 40
//     },
//     {
//         name: 'ab',
//         age: 36
//     }
// ];

// self.lobList = _.flow(
//     _.filter({ clientId: $scope.actionItemFilter.clientId }),
//     _.sortBy('lobName')
// )(UserSession.getUserInfo().clientLobs);

// // let d = fp.filter(u => u.age >= 36)(users);
// let d = fp.flow(
//     fp.filter(u => u.age >= 36),
//     fp.sortBy('name')
// )(users);

// console.log('d:', d);

const line = () => console.log('-'.repeat(80));

line();
console.log(`index.js...`);
line();

import defaultMethod, { serviceCall, options, methodOne, mTwo as methodTwo } from './service';
defaultMethod('d to the fault');
serviceCall('the params');
console.log('service options:', options);
methodOne('one');
methodTwo('two');
line();

import otherExplicitDefaultMethod from './otherService'; // explicit default import
otherExplicitDefaultMethod('explicit other d to the fault');

import { default as otherDefaultMethod } from './otherService'; // default manually imported and renamed
otherDefaultMethod('manual other d to the fault');

import * as otherService from './otherService';  // import all module exports, default referenced by <module_object>.default
console.log('otherService:', otherService);
otherService.default('<module_object>.default other d to the fault');
otherService.serviceCall('the other params');
console.log('other service options:', otherService.options);
console.log('other service theVar:', otherService.theVar);
otherService.methodOne('other one');
otherService.mTwo('other two');
otherService.asyncFn()
    .then(x => console.log('other service asyncFn x:', x));
otherService.asyncValueFn()
    .then(x => console.log('other service asyncValueFn x:', x));
otherService.promiseFn()
    .then(x => x * 2)
    .then(x => console.log('other service promiseFn x:', x));
line();

import * as passThroughAll from './passThroughAll';
console.log('passThroughAll:', passThroughAll);
passThroughAll.default('passThroughAll d to the d to the fault');
passThroughAll.serviceCall('passThroughAll the other params');
console.log('passThroughAll other service options:', passThroughAll.options);
passThroughAll.methodOne('passThroughAll other one');
passThroughAll.mTwo('passThroughAll other two');
line();

import passThroughDefault, * as passThrough from './passThroughAll';
console.log('passThrough:', passThrough);
passThroughDefault('passThroughDefault d to the d to the d to the fault');
passThrough.serviceCall('passThrough the other params');
console.log('passThrough other service options:', passThrough.options);
passThrough.methodOne('passThrough other one');
passThrough.mTwo('passThrough other two');
line();

import defaultMethodPassByName, { serviceCall as sCall, _options, methodOne as m1, methodTWO, theVar as _theVar } from './passThroughByName';
defaultMethodPassByName('passThroughByName d to the fault');
sCall('passThroughByName the other params');
console.log('passThroughByName other service options:', _options);
console.log('passThroughByName other service theVar:', _theVar);
otherService.theVar = 'uh oh, new value assigned... will it be reflected below?';
console.log('passThroughByName other service theVar again:', _theVar);
m1('passThroughByName other one');
methodTWO('passThroughByName other two');
line();

// // method.theMethod = unexpected token error, this is not allowed
// // let method = {};
// // import { methodTWO as method.theMethod } from './passThroughByName';

import defaultYetAnotherService, { var1, varThree, var4 as four, var5 as fiveVar, CONST1 as CONSTANT_ONE, CONST2 } from './yetAnotherService';
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

// import defaultExpression from './defaultExpression';
// console.log('defaultExpression:', defaultExpression);
// line();

import { controller } from './component';
controller('the ctrl');
line();

import _ from 'lodash';
console.log('lodash:', _.VERSION);
line();

import $ from 'jquery';
console.log('jquery:', $.fn.jquery);
line();

// import angular from 'angular';
console.log('angular:', angular.version.full);
console.log('angular.element: %O', angular.element);
line();

import { $http, $q } from './ngimport2';
console.log('$http:', $http);
console.log('$q:', $q);
line();

import { $http as $http2, $q as $q2, $state, $stateParams } from './eh-import';
console.log('$http2:', $http2);
console.log('$q2:', $q2);
console.log('$state:', $state);
console.log('$stateParams:', $stateParams);
line();

// import { findIndex } from './util';
// findIndex([4, 8, 4, 8]);
import { myFindIndex } from './util';
myFindIndex([4, 8, 4, 8]);
line();
