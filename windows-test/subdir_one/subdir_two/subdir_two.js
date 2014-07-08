var fs = require('fs');

console.log('\n------ sub-directory-2 ------');
console.log('./subdir_two.js exists: ', fs.existsSync('./subdir_two.js'));
console.log('./subdir_one/subdir_two/subdir_two.js exists: ', fs.existsSync('./subdir_one/subdir_two/subdir_two.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());
