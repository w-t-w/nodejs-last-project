const Geek = require('./geek');

const geekTime = new Geek();

geekTime.addListener('newLessons', (price) => {
    if (price < 80) {
        console.log('buy!', price);
    }
});