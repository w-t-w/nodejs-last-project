const ejs = require('ejs');
const vm = require('vm');

console.log(`<h1>My name is Gary!</h1>`);
const user = {
    name: 'Gary Yin',
    age: 29
};
console.log(`<h1>My name is ${user.name}!I'm ${user.age} year's old!</h1>`);

const template = '<h1>My name is <%= user.name %>!I\'m <%= user.age %> year\'s old!</h1>';
const ejsResult = ejs.render(template, {user});
console.log(ejsResult);

const vmContext = vm.createContext({
    user
});
const vmResult = vm.runInNewContext("`<h1>My name is ${user.name}!I'm ${user.age} year's old!</h1>`", vmContext);
console.log(vmResult);

let templateList = {
    templateA: "`<h1>${include('templateB')}</h1>`",
    templateB: "`<p>My name is ${user.name}!I'm ${user.age} year's old!</p>`"
};

const templateContext = vm.createContext({
    user,
    include(name) {
        return templateList[name]();
    }
});

Object.keys(templateList).forEach(key => {
    const value = templateList[key];
    templateList[key] = vm.runInNewContext(`(function() {
        return ${value};
    })`, templateContext);
});

const templateResult = templateList['templateA']();
console.log(templateResult);