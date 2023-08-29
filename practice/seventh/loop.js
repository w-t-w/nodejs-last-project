const event = {
    queue: [],
    loop() {
        while (this.queue.length) {
            const callback = this.queue.shift();
            callback();
        }
        setTimeout(this.loop.bind(this), 50);
    },
    add(callback) {
        this.queue.push(callback);
    }
};

module.exports = event;