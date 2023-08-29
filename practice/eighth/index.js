const interview = require('./promise');

(function () {
    interview(1)
        .then(() => {
            return interview(2);
        })
        .then(() => {
            return interview(3);
        })
        .then(() => {
            console.log('smile!');
        })
        .catch(error => {
            console.error(`cry at ${error.round} round!`);
        });
})();