var fs = require('fs');

console.log('\n------ base-directory ------');
console.log('./base_directory.js exists: ', fs.existsSync('./base_directory.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());

require('./subdir_one/subdir_one.js');