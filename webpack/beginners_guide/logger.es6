// console.log('logger.js is now loaded...');

let checkName = (firstName, lastName) => {
    if (firstName !== 'nader' || lastName !== 'dabit') {
        console.log('You are not Nader Dabit');
    } else {
        console.log('You are Nader Dabit');
    }
}
checkName('nader', 'jackson');

let o = {
    name: 'robert',
    type: 'WebDev'
}
console.log('object spread:', {...o, age: 'super old'})