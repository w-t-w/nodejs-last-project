const {age} = require('./lib');
console.log(age);
const lib = require('./lib');
console.log(lib);
setTimeout(() => {
    console.log(age);
    console.log(lib.age);
    console.log(lib);
}, 2000);