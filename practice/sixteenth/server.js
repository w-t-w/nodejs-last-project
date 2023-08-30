const net = require('net');

const PORT = 4000;

const server = net.createServer((socket) => {
    socket.on('data', (buffer) => {
        setTimeout(() => {
            console.log(buffer, buffer.toString());
        }, 50);
    });
});

server.listen(PORT);