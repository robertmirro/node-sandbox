var mod = require('module');

var holdModuleExports = module.exports;

function myModule() {
    console.log('myModule');
}

function writeLog(title) {
    console.log('\n---------- ' + title + ' ----------');
    console.log('module:\n', module);
    console.log('');
    console.log('exports:\n', exports);
    console.log('');
    console.log('module.exports === exports:', module.exports === exports);
}

writeLog('init');

module.exports = myModule;
writeLog('module.exports = myModule');

// reset module.exports to its default value
module.exports = holdModuleExports;

exports.myMod = myModule;
exports.myOtherMod = function() {
    console.log('myOtherMethod');
};
exports.myMessage = 'hola';
writeLog('exports.myMod = myModule...');


// the console.log below fails when module_no_export exports nothing
var modNoExport = require('./module_no_export');
console.log(modNoExport());
