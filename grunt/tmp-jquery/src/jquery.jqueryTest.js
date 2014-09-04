/*
 * jqueryTest
 * https://github.com/robertmirro/node-sandbox
 *
 * Copyright (c) 2014 robertmirro
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.jqueryTest = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.jqueryTest = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jqueryTest.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.jqueryTest.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jqueryTest = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
