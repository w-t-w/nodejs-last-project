const EventEmitter = require('events').EventEmitter;

class Geek extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('newLessons', Math.random() * 100);
        }, 3000);
    }
}

module.exports = Geek;