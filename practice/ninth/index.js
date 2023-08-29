const interview = require('./async');
(async function () {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
    } catch (err) {
        return console.error(`cry at ${err.round} round!`);
    }
    console.log('smile!');
})();