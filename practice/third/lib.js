exports.name = '尹文楷';
exports.age = 29;
exports.hobby = {
    sports: 'basketball'
};
module.exports = {
    name: 'wtw',
    age: 28,
    hobby: {
        sports: 'baseball'
    }
};
setTimeout(() => {
    exports.age = 30;
    module.exports.age = 29;
    module.exports.name = 'white-than-wood';
}, 1000);