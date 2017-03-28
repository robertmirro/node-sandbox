// import $ from 'jquery';
// global.jQuery = global.$ = $;
// import 'angular';
// import 'angular-ui-router';
// import 'lodash';

// have to use require() otherwise jquery is loaded after angular for some reason, might be a result of babel
global.$ = global.jQuery = require('jquery');
require('angular');
require('angular-ui-router');
require('lodash');
