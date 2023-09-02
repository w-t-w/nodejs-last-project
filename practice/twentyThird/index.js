const cp = require('child_process');
const path = require('path');

const child_process = cp.fork(path.resolve(__dirname, './cp.js'));

child_process.send('haha');
child_process.on('message', (data) => {
    console.log(data);
});