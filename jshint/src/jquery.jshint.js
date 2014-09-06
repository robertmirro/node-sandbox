/*
 * jshint
 * https://github.com/robertmirro/node-sandbox
 *
 * Copyright (c) 2014 robertmirro
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.jshint = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.jshint = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jshint.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.jshint.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].jshint = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
