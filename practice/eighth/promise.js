module.exports = function interview(round) {
    return new Promise((resolve, reject) => {
        const result = Math.random();
        if (result > 0.3) {
            resolve('success!');
        } else {
            const error = new Error('fail!');
            error.round = round;
            reject(error);
        }
    });
};