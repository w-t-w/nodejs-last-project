const interview = require('./promiseall');

(function () {
    Promise
        .all([interview('tencent'), interview('geekTime')])
        .then(() => {
            console.log('smile!');
        })
        .catch(error => {
            console.error(`cry at ${error.name}!`);
        });
})();