//
// https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
//
// $ rm -f ./dist/*; npm run build
//
import bar from './bar'; // comment out bar and/or blah, vendor hash remains the same
console.log('bar:', bar);

// import blah from './blah';
// console.log('blah:', blah);

import preact from 'preact';
// console.log(preact.toString());
console.log('preact via chunkhash and manifest...:', preact);


