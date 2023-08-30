const net = require('net');

const socket = new net.Socket();

const PORT = 4000;

socket.connect({
    host: '127.0.0.1',
    port: PORT,
    keepAlive: true
});

socket.write(Buffer.from('hello GeekBang!'));