const net = require('net');

const PORT = 4000;

const socket = new net.Socket();

socket.connect({
    host: '127.0.0.1',
    port: PORT,
    keepAlive: true
});

let id = null,
    index = null;

const lessonIds = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]

const lessonIdLength = lessonIds.length;

index = Math.floor(Math.random() * lessonIdLength);
id = lessonIds[index];
socket.write(encode(id));

socket.on('data', (buffer) => {
    const lesson = buffer.toString();
    console.log(`位置 ${index + 1} 上课程号为 ${id} 课程为 ${lesson}!`);

    index = Math.floor(Math.random() * lessonIdLength);
    id = lessonIds[index];
    socket.write(encode(id));
});

function encode(id) {
    const body = Buffer.alloc(4);
    body.writeInt32BE(id);
    return body;
}

