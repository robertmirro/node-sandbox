webpackJsonp(["main"],{

/***/ "./src/bar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// export const bar = { name: 'bar' };
/* harmony default export */ __webpack_exports__["a"] = ({ name: 'bar' });

/***/ }),

/***/ "./src/foo.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bar__ = __webpack_require__("./src/bar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("./node_modules/preact/dist/preact.mjs");
//
// https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
//
// $ rm -f ./dist/*; npm run build
//
 // comment out bar and/or blah, vendor hash remains the same
console.log('bar:', __WEBPACK_IMPORTED_MODULE_0__bar__["a" /* default */]);

// import blah from './blah';
// console.log('blah:', blah);


// console.log(preact.toString());
console.log('preact via chunkhash and manifest...:', __WEBPACK_IMPORTED_MODULE_1_preact__["default"]);




/***/ })

},["./src/foo.js"]);