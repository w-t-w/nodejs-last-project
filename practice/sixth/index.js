const interview = require('./interview');

// try {
interview(function (err, result) {
    if (err) return console.error('error: ', err);
    console.log(result);
});
// } catch (e) {
//     console.log('sad!', e);
// }