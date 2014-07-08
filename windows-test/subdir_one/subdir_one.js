var fs = require('fs');

console.log('\n------ sub-directory-1 ------');
console.log('./subdir_one.js exists: ', fs.existsSync('./subdir_one.js'));
console.log('./subdir_one/subdir_one.js exists: ', fs.existsSync('./subdir_one/subdir_one.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());

require('./subdir_two/subdir_two.js');