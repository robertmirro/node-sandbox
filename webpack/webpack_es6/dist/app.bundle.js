/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serviceCall = serviceCall;

exports.default = function (value) {
    console.log(name + ' default:', value);
};

var name = 'other service -';

function serviceCall(params) {
    console.log(name + ' serviceCall:', params);
}

var options = exports.options = {
    name: 'serviceOptions',
    values: [1, 2, 3, 4].reverse()
};

var theVar = exports.theVar = void 0;
exports.theVar = theVar = name + ' initialized after export';

var methodOne = function methodOne(text) {
    return console.log(name + ' methodOne:', text);
};
var methodTwo = function methodTwo(text) {
    return console.log(name + ' methodTwo:', text);
};
exports.methodOne = methodOne;
exports.mTwo = methodTwo;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _otherService = __webpack_require__(0);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_otherService).default;
  }
});
Object.defineProperty(exports, 'serviceCall', {
  enumerable: true,
  get: function get() {
    return _otherService.serviceCall;
  }
});
Object.defineProperty(exports, '_options', {
  enumerable: true,
  get: function get() {
    return _otherService.options;
  }
});
Object.defineProperty(exports, 'methodOne', {
  enumerable: true,
  get: function get() {
    return _otherService.methodOne;
  }
});
Object.defineProperty(exports, 'methodTWO', {
  enumerable: true,
  get: function get() {
    return _otherService.mTwo;
  }
});
Object.defineProperty(exports, 'theVar', {
  enumerable: true,
  get: function get() {
    return _otherService.theVar;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.controller = controller;

var _passThroughByName = __webpack_require__(1);

console.log('component what value is other service theVar on init?', _passThroughByName.theVar);

function controller(name) {
    console.log('component controller:', name);
    console.log('component what value is other service theVar in controller?', _passThroughByName.theVar);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _otherService = __webpack_require__(0);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_otherService).default;
  }
});
Object.keys(_otherService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _otherService[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } // required because * doesnt export default

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serviceCall = serviceCall;

exports.default = function (value) {
    console.log(name + ' default:', value);
};

var name = 'service -';

function serviceCall(params) {
    console.log(name + ' serviceCall:', params);
}

var options = exports.options = {
    name: 'serviceOptions',
    values: [1, 2, 3, 4]
};

function methodOne(text) {
    console.log(name + ' methodOne:', text);
}
function methodTwo(text) {
    console.log(name + ' methodTwo:', text);
}

exports.methodOne = methodOne;
exports.mTwo = methodTwo;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var name = 'yet another service -';

var var1 = name + ' var1';
var var2 = name + ' var2';
var var3 = name + ' var3';
exports.var1 = var1;
exports.default = var2;
exports.varThree = var3;
var var4 = exports.var4 = name + ' var4',
    var5 = exports.var5 = name + ' var5';

var CONST1 = {
    name: name + ' const1 name',
    value: name + ' const1 va;lue'
};
var CONST2 = {
    name: name + ' const2 name',
    value: name + ' const2 value'
};

exports.CONST1 = CONST1;
exports.CONST2 = CONST2;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _service = __webpack_require__(4);

var _service2 = _interopRequireDefault(_service);

var _otherService = __webpack_require__(0);

var otherService = _interopRequireWildcard(_otherService);

var _passThroughAll = __webpack_require__(3);

var passThroughAll = _interopRequireWildcard(_passThroughAll);

var passThrough = _interopRequireWildcard(_passThroughAll);

var _passThroughByName = __webpack_require__(1);

var _passThroughByName2 = _interopRequireDefault(_passThroughByName);

var _yetAnotherService = __webpack_require__(5);

var _yetAnotherService2 = _interopRequireDefault(_yetAnotherService);

var _component = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// npm run build

var line = function line() {
  return console.log('-'.repeat(80));
};

console.log('index.js...');
line();

// method.theMethod = unexpected token error, this is not allowed
// let method = {};
// import { methodTWO as method.theMethod } from './passThroughByName';

(0, _service2.default)('d to the fault');
(0, _service.serviceCall)('the params');
console.log('service options:', _service.options);
(0, _service.methodOne)('one');
(0, _service.mTwo)('two');
line();

console.log('otherService:', otherService);
otherService.default('d to the fault');
(0, otherService.default)('other d to the fault');
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
(0, passThrough.default)('passThroughDefault d to the d to the d to the fault');
passThrough.serviceCall('passThrough the other params');
console.log('passThrough other service options:', passThrough.options);
passThrough.methodOne('passThrough other one');
passThrough.mTwo('passThrough other two');
line();

(0, _passThroughByName2.default)('passThroughByName d to the fault');
(0, _passThroughByName.serviceCall)('passThroughByName the other params');
console.log('passThroughByName other service options:', _passThroughByName._options);
console.log('passThroughByName other service theVar:', _passThroughByName.theVar);
otherService.theVar = 'uh oh, new value assigned... will it be reflected below?';
console.log('passThroughByName other service theVar again:', _passThroughByName.theVar);
(0, _passThroughByName.methodOne)('passThroughByName other one');
(0, _passThroughByName.methodTWO)('passThroughByName other two');
line();

console.log('defaultYetAnotherService:', _yetAnotherService2.default);
console.log('var1:', _yetAnotherService.var1);
console.log('varThree:', _yetAnotherService.varThree);
console.log('four:', _yetAnotherService.var4);
console.log('fiveVar:', _yetAnotherService.var5);
console.log('CONSTANT_ONE:', _yetAnotherService.CONST1);
console.log('CONST2:', _yetAnotherService.CONST2);
var name = _yetAnotherService.CONST2.name,
    theValue = _yetAnotherService.CONST2.value;

console.log('name:', name);
console.log('theValue:', theValue);
line();

(0, _component.controller)('the ctrl');
line();

/***/ })
/******/ ]);