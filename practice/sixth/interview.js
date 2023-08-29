module.exports = function interview(callback) {
    setInterval(() => {
        const result = Math.random();
        if (result > 0.2) {
            callback(null, 'smile!');
        } else {
            callback(new Error('cry!'));
        }
    }, 3000);
}