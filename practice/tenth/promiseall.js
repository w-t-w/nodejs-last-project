module.exports = function interview(name) {
    return new Promise((resolve, reject) => {
        const result = Math.random();
        if (result > 0.3) {
            resolve('success!');
        } else {
            const error = new Error('fail!');
            error.name = name;
            reject(error);
        }
    });
};