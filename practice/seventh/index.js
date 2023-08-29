const event = require('./loop');

event.loop();
setTimeout(function () {
    event.add(function () {
        console.log(1);
    });
}, 1000);
setTimeout(function () {
    event.add(function () {
        console.log(2);
    });
}, 2000);