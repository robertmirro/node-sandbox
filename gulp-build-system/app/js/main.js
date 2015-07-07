;(function() {
    'use strict';

    var myVar = 'testing 1, 2, 4...';
    console.log('inside of main.js: myVar:', myVar);

    function test() {
        console.log('test function...');
    }
    test();

    document.getElementById('sweet-header').innerHTML = 'A NEWER NEW HEADER TEXT...';

})();

